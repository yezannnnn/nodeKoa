const todo = {
	create:{
		title:{type:'string' ,required:true},
		content:{type:'string' ,required:true},
		expires: {type: 'string', required: true},
	},
}

module.exports = todo