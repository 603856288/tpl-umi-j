
#!/bin/bash
if [ $DEPLOY_ENV = 'dev' ]
then
  sed -i 's@<servername>@******@' /etc/nginx/conf.d/nginx_app.conf
  sed -i 's@<placeholder>@******@' /etc/nginx/conf.d/nginx_app.conf
elif [ $DEPLOY_ENV = 'test' ]
then
  sed -i 's@<servername>@******@' /etc/nginx/conf.d/nginx_app.conf
  sed -i 's@<placeholder>@******@' /etc/nginx/conf.d/nginx_app.conf
elif [ $DEPLOY_ENV = 'uat' ]
then
  sed -i 's@<servername>@******@' /etc/nginx/conf.d/nginx_app.conf
  sed -i 's@<placeholder>@******@' /etc/nginx/conf.d/nginx_app.conf
elif [ $DEPLOY_ENV = 'pre' ]
then
  sed -i 's@<servername>@******@' /etc/nginx/conf.d/nginx_app.conf
  sed -i 's@<placeholder>@******@' /etc/nginx/conf.d/nginx_app.conf
elif [ $DEPLOY_ENV = 'prd' ]
then
  sed -i 's@<servername>@******@' /etc/nginx/conf.d/nginx_app.conf
  sed -i 's@<placeholder>@******@' /etc/nginx/conf.d/nginx_app.conf
fi

nginx -g "daemon off"\;
