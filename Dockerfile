FROM alpine:latest

# 1. Install dependencies
RUN apk add --no-cache unzip ca-certificates wget

# 2. Download PocketBase (Match the version you use locally)
ADD https://github.com/pocketbase/pocketbase/releases/download/v0.36.1/pocketbase_0.36.1_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/

# 3. Copy your migrations from your repo into the image
# This assumes your 'pb_migrations' folder is in the root of your repo
COPY ./pb_migrations /pb/pb_migrations

# 4. Expose the correct port
EXPOSE 8083

# 5. Start PocketBase with the data directory mapped to a persistent volume
CMD ["/pb/pocketbase", "serve", "--http=0.0.0.0:8083", "--dir=/pb/pb_data"]