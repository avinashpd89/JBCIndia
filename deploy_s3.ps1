$BucketName = "jbcindia.in"

Write-Host "Creating S3 Bucket: $BucketName"
aws s3 mb s3://$BucketName

Write-Host "Disabling Block Public Access"
aws s3api put-public-access-block --bucket $BucketName --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false"

Write-Host "Setting Bucket Policy for Public Read"
$Policy = @"
{
  `"Version`": `"2012-10-17`",
  `"Statement`": [
    {
      `"Sid`": `"PublicReadGetObject`",
      `"Effect`": `"Allow`",
      `"Principal`": `"*`",
      `"Action`": `"s3:GetObject`",
      `"Resource`": `"arn:aws:s3:::$BucketName/*`"
    }
  ]
}
"@
Set-Content -Path policy.json -Value $Policy
aws s3api put-bucket-policy --bucket $BucketName --policy file://policy.json
Remove-Item policy.json

Write-Host "Configuring Static Website Hosting"
aws s3api put-bucket-website --bucket $BucketName --website-configuration "IndexDocument={Suffix=index.html},ErrorDocument={Key=index.html}"

Write-Host "Syncing 'dist' folder to S3 Bucket"
aws s3 sync dist/ s3://$BucketName

$Region = aws configure get region
if (-not $Region) { $Region = "ap-south-1" }
Write-Host "Deployed! Your website should be available at:"
Write-Host "http://$BucketName.s3-website.$Region.amazonaws.com"
