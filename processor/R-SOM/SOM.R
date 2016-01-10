olive<-read.table("./temp/somInputAll.txt",h=T)
newolive<-olive[,2:500]
#install.packages('som')
library(som)

n.newolive<-scale(newolive)

#install.packages('kohonen')
library(kohonen)

olive.som<-som(n.newolive, grid=somgrid(30, 30, "hexagonal"))
coolBlueHotRed <- function(n, alpha = 1) {
  rainbow(n, end=4/6, alpha=alpha)[n:1]
}

plot(olive.som,labels=olive[,1],type="counts", palette.name = coolBlueHotRed)
write(olive.som$unit.classif,file="./somClusterResult.txt")
write(olive$appId,file="./somAppIdResult.txt")
#som.hc <- cutree(hclust(dist(olive.som$codes)), 10)
#add.cluster.boundaries(olive.som,som.hc)