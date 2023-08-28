import os
import pandas as pd
from django.core.files.storage import default_storage
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import shutil

# Create your views here.
def index(request):
    return HttpResponse('Testing')


@csrf_exempt
def uploadFile(request):
    try:
        if request.method == 'POST':
            file = request.FILES['file']
            shutil.rmtree("uploads")
            if not os.path.exists('uploads'):
                os.mkdir('uploads')
            with default_storage.open(f'uploads/{file.name}', 'wb+') as destination:
                for chunk in file.chunks():
                    destination.write(chunk)
        return HttpResponse('File Uploaded')
    except Exception as e:
        return HttpResponse(str(e))


def getData(request):
    try:
        if request.method == 'GET':
            file = os.listdir('uploads')[0]
            df = pd.read_csv(os.path.join('uploads', file))
            return HttpResponse(df.to_json(orient='records'), content_type="application/json")
    except Exception as e:
        return HttpResponse(str(e))
