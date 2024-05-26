# Use nginx as base image   
FROM nginx:latest

# Delete the contents of the nginx HTML directory
RUN rm -rf /usr/share/nginx/html/*

# Copy the build output to replace the default nginx contents
COPY dist/app-inv-front/browser/ /usr/share/nginx/html/

# Expose port 80
EXPOSE 80
