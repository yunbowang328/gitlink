desc "Initialize the data for dev ops languages"
namespace :dev_ops_languages do

  task init: :environment do
    # DevOps::Language.bulk_insert do |worker|
    #   languages.each do |attrs|
    #     worker.add(attrs)
    #   end
    # end

    languages.each do |l|
      content = Base64.encode64 l[:content]
      DevOps::Language.create!(name: l[:name], content: content)
    end
  end

  def languages
    [
      {
        name: "C",
        content: "
kind: pipeline
name: default

platform:
  os: linux
  arch: arm64

steps:
- name: test
  image: gcc
  commands:
  - ./configure
  - make
  - make test"
      },
      {
        name: "C++",
        content: "
kind: pipeline
name: default

platform:
  os: linux
  arch: arm64

steps:
- name: test
  image: gcc
  commands:
  - ./configure
  - make
  - make test"
      },
      {
        name: "Docker",
        content: "
kind: pipeline
name: default

platform:
  os: linux
  arch: arm64

steps:
- name: test
  image: docker:dind
  volumes:
  - name: dockersock
    path: /var/run/docker.sock
    commands:
    - docker ps -a

volumes:
- name: dockersock
  host:
    path: /var/run/docker.sock"
      },
      {
        name: "Java",
        content: "
kind: pipeline
name: default

platform:
  os: linux
  arch: arm64

steps:
- name: test
  image: maven:3-jdk-10
  commands:
  - mvn install -DskipTests=true -Dmaven.javadoc.skip=true -B -V
  - mvn test -B"
      },
      {
        name: "R",
        content: "
kind: pipeline
name: default

platform:
  os: linux
  arch: arm64

steps:
- name: test
  image: r-base
  commands:
  - R -e 'install.packages(c('package1','package2'))'
  - R CMD build ."
      },
      {
        name: "Ruby",
        content: "
kind: pipeline
name: default

platform:
  os: linux
  arch: arm64

steps:
- name: test
  image: ruby
  commands:
  - bundle install --jobs=3 --retry=3
  - rake"
      },
      {
        name: "PHP",
        content: "
kind: pipeline
name: default

platform:
  os: linux
  arch: arm64

steps:
- name: install
  image: composer
  commands:
  - composer install

- name: test
  image: php:7
  commands:
  - vendor/bin/phpunit --configuration config.xml"
      },
      {
        name: "Python",
        content: "
kind: pipeline
name: default

platform:
  os: linux
  arch: arm64

steps:
- name: test
  image: python
  commands:
  - pip install -r requirements.txt
  - pytest"
      },
      {
        name: "MySQL",
        content: "
kind: pipeline
name: default

platform:
  os: linux
  arch: arm64

steps:
- name: test
  image: mysql
  commands:
  - sleep 15
  - mysql -u root -h database --execute='SELECT VERSION();'

services:
- name: database
  image: mysql
  environment:
    MYSQL_ALLOW_EMPTY_PASSWORD: 'yes'
    MYSQL_DATABASE: test"
      },
      {
        name: "MongoDB",
        content: "
kind: pipeline
name: default

platform:
  os: linux
  arch: arm64

steps:
- name: ping
  image: mongo:4
  commands:
  - sleep 5
  - mongo --host mongo --eval 'db.version()'

services:
- name: mongo
  image: mongo:4
  command: [ --smallfiles ]"
      },
      {
        name: "Clojure",
        content: "
kind: pipeline
name: default

platform:
  os: linux
  arch: arm64

steps:
- name: test
  image: clojure
  commands:
  - lein test"
      },
      {
        name: "CouchDB",
        content: "
kind: pipeline
name: default

platform:
  os: linux
  arch: arm64

steps:
- name: test
  image: couchdb:2.2
  commands:
  - sleep 15
  - curl http://database:5984

services:
- name: database
  image: couchdb:2.2"
      },
      {
        name: "Crystal",
        content: "
kind: pipeline
name: default

platform:
  os: linux
  arch: arm64

steps:
- name: test
  image: crystallang/crystal
  commands:
  - shards install
  - crystal spec.2"
      },
      {
        name: "D",
        content: "
kind: pipeline
name: default

platform:
  os: linux
  arch: arm64

steps:
- name: test
  image: dlanguage/dmd
  commands:
  - dub test"
      },
      {
        name: "Dart",
        content: "
kind: pipeline
name: default

platform:
  os: linux
  arch: arm64

steps:
- name: test
  image: google/dart
  commands:
  - pub get
  - pub run test"
      },
      {
        name: "Docker (dind)",
        content: "
kind: pipeline
name: default

platform:
  os: linux
  arch: arm64

steps:
- name: test
  image: docker:dind
  volumes:
  - name: dockersock
    path: /var/run
    commands:
    - sleep 5 # give docker enough time to start
    - docker ps -a

services:
- name: docker
  image: docker:dind
  privileged: true
  volumes:
  - name: dockersock
    path: /var/run

volumes:
- name: dockersock
  temp: {}"
      },
      {
        name: "Elasticsearch",
        content: "
kind: pipeline
name: default

platform:
  os: linux
  arch: arm64

steps:
- name: test
  image: alpine:3.8
  commands:
  - apk add curl
  - sleep 45
  - curl http://database:9200

services:
- name: database
  image: elasticsearch:5-alpine"
      },
      {
        name: "Elixir",
        content: "
kind: pipeline
name: default

platform:
  os: linux
  arch: arm64

steps:
- name: test
  image: elixir:1.5
  commands:
  - mix local.rebar --force
  - mix local.hex --force
  - mix deps.get
  - mix test"
      },
      {
        name: "Erlang",
        content: "
kind: pipeline
name: default

platform:
  os: linux
  arch: arm64

steps:
- name: test
  image: erlang:21
  commands:
  - rebar get-deps
  - rebar compile
  - rebar skip_deps=true eunit"
      },
      {
        name: "20.Go (with Gopath)",
        content: "
kind: pipeline
name: default

platform:
  os: linux
  arch: arm64

workspace:
  base: /go
  path: src/hello-world

steps:
- name: test
  image: golang
  commands:
  - go get
  - go test"
      },
      {
        name: "21.Go (with Modules)",
        content: "
kind: pipeline
name: default

platform:
  os: linux
  arch: arm64

steps:
- name: test
  image: golang
  commands:
  - go test
  - go build"
      },
      {
        name: "Gradle",
        content: "
kind: pipeline
name: default

platform:
  os: linux
  arch: arm64

steps:
- name: test
  image: gradle:jdk10
  commands:
  - gradle assemble
  - gradle check"
      },
      {
        name: "Groovy",
        content: "
kind: pipeline
name: default

platform:
  os: linux
  arch: arm64

steps:
- name: test
  image: gradle:2.5-jdk8
  commands:
  - ./gradlew assemble
  - ./gradlew check"
      },
      {
        name: "Haskell",
        content: "
kind: pipeline
name: default

platform:
  os: linux
  arch: arm64

steps:
- name: test
  image: haskell
  commands:
  - cabal install --only-dependencies --enable-tests
  - cabal configure --enable-tests
  - cabal build
  - cabal test"
      },
      {
        name: "Haxe",
        content: "
kind: pipeline
name: default

platform:
  os: linux
  arch: arm64

steps:
- name: test
  image: haxe
  commands:
  - haxelib install build.hxml
  - haxe build.hxml"
      },
      {
        name: "MariaDB",
        content: "
kind: pipeline
name: default

platform:
  os: linux
  arch: arm64

steps:
- name: test
  image: mariadb
  commands:
  - sleep 15
  - mysql -u root -h database --execute='SELECT VERSION();'

services:
- name: database
  image: mariadb
  environment:
    MYSQL_ALLOW_EMPTY_PASSWORD: 'yes'
    MYSQL_DATABASE: test"
      },
      {
        name: "Maven",
        content: "
kind: pipeline
name: default

platform:
  os: linux
  arch: arm64

steps:
- name: test
  image: maven:3-jdk-10
  commands:
  - mvn install -DskipTests=true -Dmaven.javadoc.skip=true -B -V
  - mvn test -B"
      },
      {
        name: "Memcached",
        content: "
kind: pipeline
name: default

platform:
  os: linux
  arch: arm64

steps:
- name: test
  image: ubuntu
  commands:
  - apt-get update -qq
  - apt-get install -y -qq telnet > /dev/null
  - (sleep 1; echo 'stats'; sleep 2; echo 'quit';) | telnet cache 11211 || true

services:
- name: cache
  image: memcached:alpine
  command: [ -vv ]"
      },
      {
        name: "Nats",
        content: "
kind: pipeline
name: default

platform:
  os: linux
  arch: arm64

steps:
- name: test
  image: ruby:2
  commands:
  - gem install nats
  - nats-pub -s tcp://nats:4222 greeting 'hello'
  - nats-pub -s tcp://nats:4222 greeting 'world'

services:
- name: nats
  image: nats:1.3.0"
      },
      {
        name: "Node",
        content: "
kind: pipeline
name: default

platform:
  os: linux
  arch: arm64

steps:
- name: test
  image: node
  commands:
  - npm install
  - npm test"
      },
      {
        name: "Perl",
        content: "
kind: pipeline
name: default

platform:
  os: linux
  arch: arm64

steps:
- name: test
  image: perl
  commands:
  - cpanm --quiet --installdeps --notest .
  - perl Build.PL
  - ./Build test"
      },
      {
        name: "Postgres",
        content: "
kind: pipeline
name: default

platform:
  os: linux
  arch: arm64

steps:
- name: test
  image: postgres:9-alpine
  commands:
  - psql -U postgres -d test -h database

services:
- name: database
  image: postgres:9-alpine
  environment:
    POSTGRES_USER: postgres
    POSTGRES_DB: test"
      },
      {
        name: "Redis",
        content: "
kind: pipeline
name: default

platform:
  os: linux
  arch: arm64

steps:
- name: test
  image: redis
  commands:
  - sleep 5
  - redis-cli -h redis ping
  - redis-cli -h redis set FOO bar
  - redis-cli -h redis get FOO

services:
- name: redis
  image: redis"
      },
      {
        name: "RethinkDB",
        content: "
kind: pipeline
name: default

platform:
  os: linux
  arch: arm64

steps:
- name: test
  image: node:9
  commands:
  - npm install -s -g recli
  - recli -h database -j 'r.db('rethinkdb').table('stats')'

services:
- name: database
  image: rethinkdb:2
  command: [ rethinkdb, --bind, all ]"
      },
      {
        name: "Rust",
        content: "
kind: pipeline
name: default

platform:
  os: linux
  arch: arm64

steps:
- name: test
  image: rust:1.30
  commands:
  - cargo build --verbose --all
  - cargo test --verbose --all"
      },
      {
        name: "Swift",
        content: "
kind: pipeline
name: default

platform:
  os: linux
  arch: arm64

steps:
- name: test
  image: swift:4
  commands:
  - swift build
  - swift test"
      },
      {
        name: "Vault",
        content: "
kind: pipeline
name: default

platform:
  os: linux
  arch: arm64

steps:
- name: test
  image: vault:1.0.0-beta2
  environment:
    VAULT_ADDR: http://vault:8200
    VAULT_TOKEN: dummy
 commands:
 - sleep 5
 - vault kv put secret/my-secret my-value=s3cr3t
 - vault kv get secret/my-secret

services:
- name: vault
  image: vault:1.0.0-beta2
  environment:
    VAULT_DEV_ROOT_TOKEN_ID: dummy"
      }
    ]
  end
end
