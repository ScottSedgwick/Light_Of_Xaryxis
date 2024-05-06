task :pages do
    sh "jekyll build -s docs -d pages --incremental"
end

desc "Serve"
task :serve do
    sh "jekyll serve -s docs -d pages --watch --incremental"
end

desc "Clean"
task :clean do
    sh "jekyll clean -s docs -d pages"
end

desc "Build"
task :build => [:pages]
task :default => [:pages]
