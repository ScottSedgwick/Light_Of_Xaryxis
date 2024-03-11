task :pages do
    sh "jekyll build -s docs -d pages --incremental"
end

task :serve do
    sh "jekyll serve -s docs -d pages --watch --incremental"
end
