import os
import pandas as pd
from django.core.files.storage import default_storage
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import shutil
import json


# Create your views here.
def index(request):
    return HttpResponse('Testing')

def deleteData(uploadtype):
    if os.path.exists(os.path.join("uploads", uploadtype)):
        shutil.rmtree(os.path.join("uploads", uploadtype))


@csrf_exempt
def uploadFile(request, UploadType):
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
            if UploadType not in request.session.keys():
                deleteData(UploadType)
            if not os.path.exists(os.path.join('uploads', UploadType)):
                os.makedirs(os.path.join('uploads', UploadType))
            for f in files:
                with default_storage.open(os.path.join('uploads', UploadType, f'{f.name}'), 'wb+') as destination:
                    for chunk in f.chunks():
                        destination.write(chunk)
            request.session[UploadType] = True
            return HttpResponse('File Uploaded')
    except Exception as e:
        return HttpResponse(str(e))


def getData(request, DownoladType):
    """
    This method is get data from uploaded files.
    @args: None
    returns: parsed json data
    """
    try:
        if request.method == 'GET':
            files = os.listdir(os.path.join('uploads', DownoladType))
            res = []
            for file in files:
                df = pd.read_csv(os.path.join('uploads', DownoladType, file))
                df.fillna(0, inplace=True)
                temp = []
                for col in df.columns[1:]:
                    temp.append(
                        {'name': col, 'data': list(df.loc[:7, col].values), 'label': list(df.loc[:7, 'Month'].values)})
                res.append({'name': file, 'data': temp})
            return HttpResponse(json.dumps({'result': res}), content_type="application/json")
    except Exception as e:
        return HttpResponse(str(e))
