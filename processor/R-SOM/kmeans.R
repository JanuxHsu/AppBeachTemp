library(cluster)
app<-read.table("./temp/somInputAll.txt",h=T)
app_vector<-app[,2:500]
km<-kmeans(app_vector,5,100)
pca.app_vector<-princomp(scale(app_vector,scale=TRUE,center=TRUE),cor=FALSE)
pcs.app_vector<-predict(pca.app_vector)
plot(pcs.app_vector, type="n")
text(pcs.app_vector,as.character(km$cluster),col=km$cluster,cex=1.0)