task :pages do
    sh "jekyll build -s docs -d pages --incremental"
end

task :serve do
    sh "jekyll serve -s docs -d pages --watch --incremental"
end

task :clean do
    sh "jekyll clean -s docs -d pages"
end

task :build => [:pages]
task :default => [:pages]
