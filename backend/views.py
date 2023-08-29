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


@csrf_exempt
def uploadFile(request):
    """
    This method is used for uploading files
    @args: None
    returns: None
    """
    try:
        if request.method == 'POST':
            shutil.rmtree("uploads")
            files = request.FILES.getlist('file')
            if not os.path.exists('uploads'):
                os.mkdir('uploads')
            for f in files:
                with default_storage.open(f'uploads/{f.name}', 'wb+') as destination:
                    for chunk in f.chunks():
                        destination.write(chunk)
        return HttpResponse('File Uploaded')
    except Exception as e:
        return HttpResponse(str(e))


def getData(request):
    """
    This method is get data from uploaded files.
    @args: None
    returns: parsed json data
    """
    try:
        if request.method == 'GET':
            files = os.listdir('uploads')
            res = []
            for file in files:
                df = pd.read_csv(os.path.join('uploads', file))
                res.append({'name': file, 'data': df.to_json(orient='records')})
            return HttpResponse(json.dumps({'result': res}), content_type="application/json")
    except Exception as e:
        return HttpResponse(str(e))
