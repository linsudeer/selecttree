$(function() {
    var nodes = [{
        id: '111111',
        name: "父节点1",
        children: [
            { id: '22222', name: "子节点1" },
            { id: '33333', name: "子节点2" }
        ]
    }];

    $("#selectree").selectTree({
    	isSimpleNode:true,
    	debug:true,

        data: [{
                id: '11111',
                name: "父节点324242",
                children: [{ id: '22222', name: "子节点1" }, { id: '33333', name: "子节点2" }, {
                    id: '11111',
                    name: "父节点324242",
                    children: [
                        { id: '22222', name: "子节点1" },
                        { id: '33333', name: "子节点2" }
                    ]
                }]
            },
            {
                id: '77777',
                name: "父节点324242",
                children: [
                    { id: '88888', name: "子节点1" },
                    { id: '99999', name: "子节点2" }
                ]
            }
        ]
    });
});