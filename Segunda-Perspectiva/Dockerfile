# Dockerfile para Segunda-Perspectiva (Eventos FSA Web App)
# Serve arquivos estáticos gerados pelo Next.js com nginx

FROM nginx:alpine

# Copiar arquivos estáticos para o nginx
COPY app/out/ /usr/share/nginx/html/

# Configurar nginx para SPA (Single Page Application)
# Redirecionar todas as rotas para index.html para suportar rotas do Next.js
RUN echo 'server {\
    listen 80;\
    server_name localhost;\
    root /usr/share/nginx/html;\
    index index.html;\
    \
    # Gzip compression\
    gzip on;\
    gzip_vary on;\
    gzip_min_length 1024;\
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json;\
    \
    # Cache headers para assets\
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {\
        expires 1y;\
        add_header Cache-Control "public, immutable";\
    }\
    \
    # Fallback para SPA\
    location / {\
        try_files $uri $uri.html $uri/ /index.html;\
    }\
}' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]