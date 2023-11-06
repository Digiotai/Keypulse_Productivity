import os

import boto3
from botocore.exceptions import NoCredentialsError

ACCESS_KEY = 'AKIA3NJV54BKHGRE4TN3'
SECRET_KEY = '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'
base_kwargs = {
        'Bucket':"keypulsedata"}
s3 = boto3.client('s3', aws_access_key_id=ACCESS_KEY,
                      aws_secret_access_key=SECRET_KEY)
def upload_to_aws(root_dir, bucket):

    try:
        print("Uploading Data")
        for d in os.listdir(root_dir):
            for f in os.listdir(os.path.join(root_dir,d)):
                s3.upload_file(os.path.join(root_dir,d,f), bucket, fr"{d}/{f}")
        print("Upload Successful")
        return True
    except FileNotFoundError:
        print("The file was not found")
        return False
    except NoCredentialsError:
        print("Credentials not available")
        return False

# uploaded = upload_to_aws(r"G:\F\DIGIOTAI\Keypulse_Kprocess\Keypulse_Productivity\uploads", 'keypulsedata')

def download_data():
    print("Downoading Data")
    results = s3.list_objects_v2(**base_kwargs)
    for d in results["Contents"]:
        s3.download_file("keypulsedata",d["Key"],os.path.join("uploads",d['Key']))
    print("Downoaded Data")


download_data()
