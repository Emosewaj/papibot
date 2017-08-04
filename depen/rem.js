exports.other = function(cmd,args){
    if (args[0] == undefined) return;
	for (i=0; i < args.length; i++) {
        if (args[i] == "yourself") {args[i] = "myself";break;}
        if (args[i] == "you") {args[i] = "me";break;}
        if (args[i] == "your") {args[i] = "my";break;}
        if (args[i] == "myself") {args[i] = "yourself";break;}
        if (args[i] == "me") {args[i] = "you";break;}
        if (args[i] == "my") {args [i] = "your";break;}
	}
	switch (Math.floor((Math.random() * 10) + 1)) {
		case 1:
			var ending = ", pal!";break;
		case 2:
			var ending = ", fam!";break;
		case 3:
			var ending = ", bro!";break;
		case 4:
			var ending = ", bud!";break;
		case 5:
			var ending = ", dude!";break;
		case 6:
			var ending = ", comrade!";break;
		case 7:
			var ending = ", partner!";break;
		case 8:
			var ending = ", mate!";break;
		case 9:
			var ending = ", goy!";break;
		case 10:
			var ending = ", gurl!";break;
	}
	if (cmd == "eat") {
		return ("ate "+args.join(" ")+ending);
	}
	if (cmd == "be") {
		return ("been "+args.join(" ")+ending);
	} 
	if (cmd == "sleep") {
		return ("slept "+args.join(" ")+ending);
	}
	if (cmd == "do") {
		return ("did "+args.join(" ")+ending);
	}
	if (cmd == "poop") {
		return ("pooped "+args.join(" ")+ending);
	}
	if (cmd == "make") {
		return ("made "+args.join(" ")+ending);
	}
	if (cmd == "have") {
		return ("had "+args.join(" ")+ending);
	}
	if (cmd == "tell") {
		return ("told "+args.join(" ")+ending);
	}
	if (cmd == "go") {
		let argsstring = args.join(" ").toString();
		let args2 = argsstring.split(" ").slice(1);
		return ("gone "+args[0]+"ed "+args2.join(" ")+ending);
	}
	if (cmd.endsWith("n") == true) {
		return (cmd+"ned "+args.join(" ")+ending);
	}
	if (cmd.endsWith("p") == true) {
		return (cmd+"ped "+args.join(" ")+ending);
	} 
	if (cmd.endsWith("e") == true) {
		return (cmd+"d "+args.join(" ")+ending);
	}
	if (cmd.endsWith("b") == true) {
		return (cmd+"bed "+args.join(" ")+ending);
	}
	if (cmd.endsWith("g") == true) {
		return (cmd+"ged "+args.join(" ")+ending);
	}
	if (cmd.endsWith("ss") == true) {
		return (cmd+"ed "+args.join(" ")+ending);
	}
	if (cmd.endsWith("s") == true) {
		return (cmd+"sed "+args.join(" ")+ending);
	}
	if (cmd.endsWith("w") == true) {
		return (cmd+"n "+args.join(" ")+ending);
	} else {
		return (cmd+"ed "+args.join(" ")+ending);
	}
}
