const account = {
	login:{
		username:{type:'string' ,required:true},
		password:{type:'string' ,required:true, max: 6}
	},
	create:{
		username:{type:'string' ,required:true},
		password:{type:'string' ,required:true, max: 6},
		role:{type: 'number', required: true}
	},
	update:{
		id:{type: 'id', required: true},
		username:{type:'string' ,required:true},
		password:{type:'string' ,required:true, max: 6},
		role:{type: 'number', required: true}
	},
}

module.exports = account