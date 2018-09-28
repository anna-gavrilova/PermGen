

        // //function generates all sets of numbers from 1 to whatever the length of array of even/odd numbers is
        // //we are going to use it later for applying to the array of inputted even or odd numbers
        // //the sets this function returns is pretty much the sets of indeces, however, they start from 1 since
        // //formula doesn't seem to be working well with 0
        function permute(arr,amt,fs,fp) {
            var start=[];
            //fp='./test.csv';
            for(var i=0;i<amt;i++){
                start.push(arr[i]);
                //at the exit  we are having the initial set of amt to start with
                
            }
             fs.writeFileSync(fp, start+"\r\n");
             
             
             
            var workingIndex=amt-1;//this is the current index we're looping through and incrementing
            
            while(workingIndex>=0){
                
                while(start[workingIndex]<arr.length-amt+workingIndex+1){
                var copy=start.slice(0);//slicing to aviod overriting by reference
                copy[workingIndex]++;
                fs.appendFileSync(fp, copy+"\r\n", function (err) {
                    
					  if (err) throw err;
					});
                
                start=copy;
                //at the exit of the while loop we're having the max possible for the first 3set as well as first set of results
                }
                
                if(start[workingIndex]==arr.length-amt+workingIndex+1){
                  if(start[workingIndex-1]<arr.length-amt+workingIndex-1+1){
                     //if the last element reached it's maximum (element<N-m+i) and the previos element has not reached it yet
                     //we are incrementing the previous element and returning to the end of working copy to start over
                  copy=start.slice(0);
                  copy[workingIndex-1]++;
                  for(var j=workingIndex;j<amt;j++){
                    copy[j]=copy[j-1]+1;
                  }
                  
                fs.appendFileSync(fp, copy+"\r\n", function (err) {
                    
					  if (err) throw err;
					});
                
                start=copy;
                workingIndex=amt-1;
                continue;
                  }
    
                  else workingIndex--;
                  
                  }
                
                
                
            }
            
            }


function getInput(val){
	var val=val.split(",");
	var inputEven=[],
		inputOdd=[];
	for(var i=0;i<val.length;i++){
		if(val[i]%2==0)
			inputEven.push(val[i]);
		else inputOdd.push(val[i]);

	}
	//return {'inputEven':inputEven,'inputOdd':inputOdd};
	return ([inputEven,inputOdd]);
}

 /*
        *Function that collects data from the input table and combines
        *it into multi-dimensional array,
        *each row in which represents the group,
        *first column is the amount of even numbers in that group
        *second column is the amount of odd numbers in that group
        *@returns array
        */
        function getData(groupAmt){
            var groupData=[];
            var groupsAmt=groupAmt;
            for(i=0;i<groupsAmt;i++){
            	var tempe="even-in-"+i;
            	var tempo="odd-in-"+i;
                var even=req.query.tempe;
                var odd=req.query.tempo;
                groupData.push([even,odd]);
            }
            
            return groupData;
        }
        function factorial(n) {
			  var fact = 1;

			  for ( var i = 2; i <= n; i++ ) {
			    fact = fact * i;
			  }

			  return fact;
			}
         //core function that generates sets of indeces,applies them to inout and stores it.
        function calculate(data,input,fs,path,out, cb){
            


            var wholeResult={};
            var totalEven=input[0],
            	totalOdd=input[1];
            	//quick sanity checks
             
             	var m1=data[0][0]
             	var m2=data[0][1]
                var N1=totalEven.length;
                var N2=totalOdd.length
                var amtTotal1=factorial(N1)/factorial(m1)/factorial(N1-m1);
                var amtTotal2=factorial(N2)/factorial(m2)/factorial(N2-m2);
                
                
                
             
            // 	console.log("amtTotal1="+amtTotal1+" amtTotal2="+amtTotal2);
            // 	if(m1>totalEven.length || m2>totalOdd.length){
            // 		console.log("ERROR:not enough numbers in the input");
            // 		return;
            // 	}
            // 	if(amtTotal1>3000000 ||  amtTotal2>3000000){
            // 		console.log("ERROR:too many entries; will take too long. Please reduce the amount of numbers in the input and/or amt of numbers in groups ");
            // 		return;
            // 	}
            // }


            var evenIndeces=[];
            for(var i=1;i<=totalEven.length;i++){
                evenIndeces.push(i);
            }
            //these are just arrays 1-to length of initial array of odd / even numbers (to have something to work with in permute function)
            var oddIndeces=[];
            for(var i=1;i<=totalOdd.length;i++){
                oddIndeces.push(i);
            }
            //we have  arrays of indeces with the same length as the total arrays from the input we have

            for(var i=0;i<data.length;i++){
                //for each group we're generating new sets of length specified of possible indeces
               
                var pEven = path.join(__dirname,"/res/tempEven.txt");
                permute(evenIndeces,data[i][0],fs,pEven);
                var pOdd= path.join(__dirname, '/res/tempOdd.txt');
               	permute(oddIndeces,data[i][1],fs,pOdd);
                  
                var evenIndecesSet,oddIndecesSet;
                //read from files and break if nesessary
               var text = fs.readFileSync(pEven).toString('utf-8');
                var evenIndecesSet = text.split("\r\n");
                

				var text = fs.readFileSync(pOdd).toString('utf-8');
                var oddIndecesSet = text.split("\r\n");
                
                

                for(var j=0;j<evenIndecesSet.length-1;j++){//for each line of even indeces
                    var temp=[]
                    var first=[];
                    evenIndecesSet[j]=evenIndecesSet[j].split(",");
                    for(var k=0;k<evenIndecesSet[0].length;k++){//added the first element of temp
                        first.push(totalEven[evenIndecesSet[j][k]-1])
                    }
                    
                    var copyodd=oddIndecesSet.slice();
                        for(var a=0;a<copyodd.length-1;a++){//each line of odd indeces
                            var second=[];
                            copyodd[a]=copyodd[a].split(",");//each character in each line
                            temp[0]=first.join();
                            for(var b=0;b<copyodd[0].length;b++){
                                second.push(totalOdd[copyodd[a][b]-1])
                                
                            }
                            temp[1]=second.join();
                            fs.appendFileSync(out, temp.join()+"\r\n", function (err) {
                                
                                if (err) throw err;
                                console.log('Output.txt Saved!');
                              }); 
                        }

                          


                    }



                }
            cb()
        }

   


module.exports.calculate=calculate;
module.exports.getInput=getInput;
module.exports.getData=getData;