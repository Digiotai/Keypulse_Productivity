import os
import pandas as pd
from django.core.files.storage import default_storage
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import shutil
import json

targetdata = {'kpUnitsYTD.csv': 45000, "kpUnitsLost.csv": 35, "kpPlantProd.csv": 75}
files = {"RiskManagementInitiatives": "kpRMI"}

sustainabilityInference = {
    "kpEnergy.csv": "Energy consumption by Chillers is 7% more than energy consumed by the other 3 types of machines "
                    "During the period of observation, Boilers have consumed least energy, 3% down MoM",
    "kpAltEnergy.csv": "Solar energy generated is highest during the fiscal Wind energy dropped "
                       "by 0.7% YoY owing to unplanned downtime of two windmills",
    "kpPlantation.csv": "Summer months have seen lower count of plantation as expected Early showers helped double "
                        "the plantations in the month of July.",
    "kpWaste.csv": "Overall waste generation is found to be within the set limits Recyclable waste segregation needs "
                   "attention as the aggregate so far is less than expected",
    "kpWater.csv": "Recycle water usage has increased to 2.1% Premium water purchase has gone down by 1.8%"
}


def copyDefaultData():
    shutil.copytree('defaultData', 'uploads', dirs_exist_ok=True)


copyDefaultData()


# Create your views here.
def index(request):
    return HttpResponse('Testing')


def deleteData(kpi):
    if os.path.exists(os.path.join("uploads", kpi)):
        shutil.rmtree(os.path.join("uploads", kpi))


@csrf_exempt
def uploadFile(request, kpi):
    """
    This method is used for uploading files
    @args: None
    returns: None
    """
    try:
        if request.method == 'POST':
            files = request.FILES.getlist('file')
            if len(files) < 1:
                return HttpResponse('No files uploaded')
            if kpi not in request.session.keys():
                deleteData(kpi)
            if not os.path.exists(os.path.join('uploads', kpi)):
                os.makedirs(os.path.join('uploads', kpi))
            for f in files:
                with default_storage.open(os.path.join('uploads', kpi, f'{f.name}'), 'wb+') as destination:
                    for chunk in f.chunks():
                        destination.write(chunk)
            request.session[kpi] = True
            return HttpResponse('File Uploaded')
    except Exception as e:
        return HttpResponse(str(e))


def getData(request, kpi):
    """
    This method is get data from uploaded files.
    @args: None
    returns: parsed json data
    """
    try:
        if request.method == 'GET':
            files = os.listdir(os.path.join('uploads', kpi))
            res = []
            inference = ''
            for file in files:
                df = pd.read_csv(os.path.join('uploads', kpi, file))
                df.dropna(how='all', inplace=True)
                df.fillna(0, inplace=True)
                temp = []
                for col in df.columns[1:]:
                    temp.append(
                        {'name': col, 'data': list(df.loc[:7, col].values), 'label': list(df.loc[:7, 'Month'].values)})
                if file in ['kpUnitsYTD.csv', 'kpUnitsLost.csv', "kpPlantProd.csv"]:
                    inference = getProductivityInference(df, file, kpi)
                elif file in ['kpBCP.csv', "kpCOMM.csv", 'kpCSM.csv', 'kpCST.csv', 'kpIM.csv', 'kpCCM.csv', 'kpPF.csv',
                              'kpRMI.csv', 'kpVMR.csv']:
                    inference = getResilienceInference(df, kpi)
                elif kpi == 'sustainability':
                    inference = sustainabilityInference[file]
                res.append({'name': file, 'data': temp, 'inference': inference})
            return HttpResponse(json.dumps({'result': res}), content_type="application/json")
    except Exception as e:
        return HttpResponse(str(e))


def getProductivityInference(df, file, kpi):
    res = ''
    if file == 'kpPlantProd.csv':
        name = "Plant Productivity (%)"
    else:
        name = 'Units'
    df[name] = pd.to_numeric(df[name])
    actual = sum(df[name]) / df.shape[0]
    planned = targetdata[file]

    i1 = actual / planned

    if i1 > 0.9:
        res += 'I1: Status: Good. Maintain and adhere to the process'
    elif (i1 >= 0.7) and (i1 < 0.9):
        res += 'I1: Status: OK. Need to ramp up'
    else:
        res += 'I1: Status: Bad, Needs attention and escalation to bring back on the track'
    res += '<br>'
    i2 = df.sort_values(by=name).reset_index(drop=True)
    res += f'I2: {i2.loc[0, "Month"]} and {i2.loc[1, "Month"]}  have lower {kpi}'
    res += '<br>'
    if i2.iloc[-1, 1] > planned:
        res += f'I3: {i2.iloc[-1, 0]} is high yielding. Congratulations'
    return res


def getResilienceInference(data, kpi):
    try:
        res = ''
        avgplanned = sum(data['Planned']) / data.shape[0]
        avgactual = sum(data['Actual']) / data.shape[0]
        i1 = avgactual / avgplanned
        if i1 > 0.9:
            res += 'I1: Status: Good. Maintain and adhere to the process'
        elif (i1 >= 0.7) and (i1 < 0.9):
            res += 'I1: Status: OK. Need to ramp up'
        else:
            res += 'I1: Status: Bad, Needs attention and escalation to bring back on the track'
        res += '<br>'
        i2 = data.sort_values(by='Actual').reset_index(drop=True)
        res += f'I2: {i2.loc[0, "Month"]} and {i2.loc[1, "Month"]}  have lower {kpi}'
        res += '<br>'
        if i2.iloc[-1, 1] > avgplanned:
            res += f'I3: {i2.iloc[-1, 0]} is high yielding. Congratulations'
        return res
    except Exception as e:
        print(e)
