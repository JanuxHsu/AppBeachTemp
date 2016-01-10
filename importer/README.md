<h2>Batch Import CallSequenceData To MongoDB</h2>
<hr/>
<h4>Excution:</h4>
http://docs.mongodb.org/manual/reference/mongo-shell/
<pre>
sudo mongo
mongo localhost/CallSequenceResults
</pre>
<pre>
mongod --fork --logPath=./mongoLog
node importer.js > exec.log 2>&1 &
</pre>
