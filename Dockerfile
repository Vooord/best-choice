FROM node:10-alpine AS node
# ARG JAR_FILE=admin-backend/admin-core/target/admin-backend.jar
# ARG STATIC_DIST=best-choice/build/
# RUN apt-get update && \
#     apt-get install -y bash gawk sed grep bc coreutils tzdata ttf-dejavu fontconfig nginx && \
#     mkdir -p /run/nginx
# RUN useradd -u 1000 -ms /bin/bash target && useradd nginx
# COPY docker/nginx.conf /etc/nginx/

# RUN cd best-choice/ && npm install && npm build && cd -
# RUN mkdir /www
# COPY best-choice/build/ /www/best-choice
# # ne rabotaet
# RUN mkdir /www && mkdir /app && \
#     chown -R target:target /var/lib/nginx && \
#     chown -R target:target /www && \
#     chown -R target:target /app && \
#     touch /run/nginx/nginx.pid && \
#     chown -R target:target /run/nginx/nginx.pid && \
#     mkdir /var/cache/nginx && \
#     chown -R target:target /var/cache/nginx && \
#     mkdir /var/tmp/nginx && \
#     chown -R target:target /var/tmp/nginx && \
#     chown -R target:target /var/log/nginx
# COPY ${STATIC_DIST}/ /www/
# COPY ${JAR_FILE} /app/app.jar
# RUN chown target:target /app/app.jar
# COPY docker/entrypoint.sh /
# RUN chown target:target /entrypoint.sh
# RUN ["chmod", "+x", "/entrypoint.sh"]
# CMD ["/entrypoint.sh"]
