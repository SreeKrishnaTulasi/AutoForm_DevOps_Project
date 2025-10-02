# 1. Start with a base image
FROM nginx:alpine

# 2. Remove default nginx website files
RUN rm -rf /usr/share/nginx/html/*

# 3. Copy your project files into nginx html directory
COPY . /usr/share/nginx/html

# 4. Open port 80 so app can be accessed
EXPOSE 80

# 5. Run nginx in the foreground (default command)
CMD ["nginx", "-g", "daemon off;"]
