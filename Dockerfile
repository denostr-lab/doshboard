FROM denoland/deno:1.33.2 as base

ARG GIT_REVISION
ARG GIT_VERSION
ENV DENO_DEPLOYMENT_ID=${GIT_REVISION}
ENV APP_REV=${GIT_REVISION}
ENV APP_VERSION=${GIT_VERSION}

LABEL org.opencontainers.image.title=noshboard
LABEL org.opencontainers.image.description="a Nostr relays dashboard"
LABEL org.opencontainers.image.authors=GUAKAMOLI
LABEL org.opencontainers.image.licenses=MIT

# Create the app directory
WORKDIR /app

# set cache path
ENV DENO_DIR=/app/.cache

FROM base as cache

# Copy the app files
COPY --chown=deno:deno . .
# Cache dependencies
RUN deno task cache

FROM base as runner

# Copy the app to the container
COPY --chown=deno:deno --from=cache /app .

# Run with lower permissions and improve security
USER deno

EXPOSE 8088

CMD ["task", "start"]
