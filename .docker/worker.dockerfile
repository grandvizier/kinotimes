FROM kinotimes_base:latest
RUN apt-get update && apt-get install -y cron

# Add local cron file to the cron directory
COPY ./.docker/film-cron /etc/cron.d/film-cron
RUN chmod 0644 /etc/cron.d/film-cron
RUN touch /var/log/cron.log

CMD cron && tail -f /var/log/cron.log
