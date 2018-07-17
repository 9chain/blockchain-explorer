#!/bin/sh

watch_file=/tmp/watch
wait_file=/tmp/wait

start_explorer() {
    echo `uptime` "start explorer"
    /opt/start_explorer.sh

    while true; do
        if [ -e $watch_file ]
        then
            echo `uptime` "start explorer"
            /opt/start_explorer.sh
        elif [ -e $wait_file ]
        then
            echo `uptime`
        else
            echo "none"
            break
        fi

        sleep 3
    done
}

start_explorer &
wait

test -e $watch_file && rm $watch_file
test -e $wait_file && rm $wait_file
