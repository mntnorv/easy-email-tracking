web: bin/rails server -p $PORT -e $RAILS_ENV
resque: env TERM_CHILD=1 RESQUE_TERM_TIMEOUT=7 QUEUE=* bundle exec rake resque:work
scheduler: bundle exec resque-scheduler