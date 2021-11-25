FROM base-registry.zhonganinfo.com/env/node-ngx:11.10.1

WORKDIR /root/app
RUN mkdir -p /alidata1/admin/za-zachart-plugin/logs/
ENV SASS_BINARY_SITE https://npm.taobao.org/mirrors/node-sass/
ENV NPM_CONFIG_REGISTRY https://npm.zhonganinfo.com

COPY package.json /root/app/
RUN npm install
COPY ./ /root/app

COPY nginx_app.conf /etc/nginx/conf.d/
RUN rm -f /etc/nginx/conf.d/default.conf && npm run build && rm -rf node_modules && chmod 755 /root -R
EXPOSE 8080
CMD ["sh", "start.sh"]
