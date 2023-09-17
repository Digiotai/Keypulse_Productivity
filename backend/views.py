import os
import pandas as pd
from django.core.files.storage import default_storage
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import shutil
import json

targetdata = {
    'kpUnitsYTD.csv': 45000, "kpUnitsLost.csv": 35, "kpPlantProd.csv": 75,
    "kpEnergyRobotic Arm": 1100, "kpEnergyRoller Belts": 850, "kpEnergyBoilers": 700, "kpEnergyChillers": 455,
    "kpWaterRobotic Arm": 30320, "kpWaterRoller Belts": 9065, "kpWaterBoilers": 28420, "kpWaterChillers": 16750,
    "kpAltEnergyWind Energy": 13, "kpAltEnergySolar Energy": 7, "kpco2co2": 30, "kpPlantationPlantation": 8575.25,
    "kpWasteMicelleneous": 180, "kpWasteGeneral": 145, "kpWasterecyclable": 97, "kpWastecritical": 20,
    "kpWastewaste": 42
}
files = {"RiskManagementInitiatives": "kpRMI"}


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
                predictions = pd.read_excel("predictions.xlsx", sheet_name=file[:-4], engine="openpyxl")
                df.dropna(how='all', inplace=True)
                df.fillna(0, inplace=True)
                df = df.iloc[:8, :]
                temp = []
                for col in df.columns[1:]:
                    temp.append(
                        {'name': col, 'data': list(df.loc[:, col].values),
                         'label': list(df.loc[:, 'Month'].values),
                         'predictions': list(map(str,predictions.loc[8:, col]))})
                if file in ['kpUnitsYTD.csv', 'kpUnitsLost.csv', "kpPlantProd.csv"]:
                    inference = getProductivityInference(df, file)
                elif kpi == 'resilience':
                    inference = getResilienceInference(df, file)
                elif kpi == 'sustainability':
                    inference = getSustainabilityInference(df, file)
                res.append({'name': file, 'data': temp, 'inference': inference})
            return HttpResponse(json.dumps({'result': res}), content_type="application/json")
    except Exception as e:
        return HttpResponse(str(e))


def getSustainabilityInference(df, file):
    res = []
    for col in df.columns[1:]:
        avgplanned = targetdata[file.replace('.csv', '') + col]
        avgactual = sum(df[col]) / df.shape[0]
        i1 = avgactual / avgplanned

        if i1 > 0.9:
            if col != file.replace(".csv", "")[2:]:
                tname = col + " " + file.replace(".csv", "")[2:]
            else:
                tname = col
            res.append(f'{tname} Status: Good. Maintain and adhere to the process')
        elif (i1 >= 0.7) and (i1 < 0.9):
            res.append(f'{col} Status: OK. Need to ramp up')
        else:
            res.append(f'{col} Status: Bad, Needs attention and escalation to bring back on the track')

        i2 = df.sort_values(by=col).reset_index(drop=True)
        if file.startswith('kpEnergy'):
            inftemp = f'{col} was lower in {i2.loc[0, "Month"]}, {i2.loc[1, "Month"]}'
        elif file.startswith('kpWaste'):
            inftemp = f'Congratulations, {col} produced by each machine was lower in {i2.loc[0, "Month"]}, {i2.loc[1, "Month"]}'
        elif file.startswith('kpPlantation'):
            inftemp = f'Plantation was lower in {i2.loc[0, "Month"]}, {i2.loc[1, "Month"]}'
        elif file.startswith('kpWater'):
            inftemp = f'Water utilised was lower in {i2.loc[0, "Month"]}, {i2.loc[1, "Month"]}'
        elif file.startswith('kpco2'):
            inftemp = f'Congratulations, Co2 emission was lower in {i2.loc[0, "Month"]}, {i2.loc[1, "Month"]}'
        else:
            inftemp = f'{i2.loc[0, "Month"]} and {i2.loc[1, "Month"]}  have lower {col}'

        if i2.iloc[-1, 1] > avgplanned:
            if file.startswith('kpWaste'):
                inftemp += f'.Attention, {col} produced by each machine was higher in {i2.iloc[-1, 0]}'
            elif file.startswith('kpco2'):
                inftemp += f'. Attention, Co2 emission was higher in {i2.iloc[-1, 0]}'
            else:
                inftemp += f' and higher in {i2.iloc[-1, 0]}.'
        res.append(inftemp)
    return res


def getProductivityInference(df, file):
    res = []
    if file == 'kpPlantProd.csv':
        name = "Plant Productivity (%)"
    else:
        name = 'Units'
    df[name] = pd.to_numeric(df[name])
    actual = sum(df[name]) / df.shape[0]
    planned = targetdata[file]

    i1 = actual / planned

    if i1 > 0.9:
        res.append('Status: Good. Maintain and adhere to the process')
    elif (i1 >= 0.7) and (i1 < 0.9):
        res.append('Status: OK. Need to ramp up')
    else:
        res.append('Status: Bad, Needs attention and escalation to bring back on the track')

    i2 = df.sort_values(by=name).reset_index(drop=True)
    if file.startswith("kpUnitsLost"):
        res.append(
            f'Congratulations. {i2.loc[0, "Month"]} and {i2.loc[1, "Month"]}  has lower {file.replace(".csv", "")[2:]}')
    else:
        res.append(f'{i2.loc[0, "Month"]} and {i2.loc[1, "Month"]}  has lower {file.replace(".csv", "")[2:]}')
    if i2.iloc[-1, 1] > planned:
        if file.startswith("kpUnitsLost"):
            res.append(
                f'Attention required. {i2.iloc[-1, 0]}  has higher {file.replace(".csv", "")[2:]}')
        else:
            res.append(f'{i2.iloc[-1, 0]} has high yielding . Congratulations')
    return res


def getResilienceInference(df, file):
    try:
        res = []
        avgplanned = sum(df['Planned']) / df.shape[0]
        avgactual = sum(df['Actual']) / df.shape[0]
        i1 = avgactual / avgplanned
        if file.replace(".csv", "")[2:] == 'PF':
            filename = 'CSM'
        else:
            filename = file.replace(".csv", "")[2:]
        if i1 > 0.9:
            res.append('Status: Good. Maintain and adhere to the process')
        elif (i1 >= 0.7) and (i1 < 0.9):
            res.append('Status: OK. Need to ramp up')
        else:
            res.append('Status: Bad, Needs attention and escalation to bring back on the track')
        i2 = df.sort_values(by='Actual').reset_index(drop=True)
        res.append(
            f'{i2.loc[0, "Month"]} and {i2.loc[1, "Month"]}  has lower {filename} activities')
        if i2.iloc[-1, 1] > avgplanned:
            res.append(f'{i2.iloc[-1, 0]} has higher {filename} activities')
        return res
    except Exception as e:
        print(e)
