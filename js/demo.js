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
        isSimpleNode: true,
        debug: true,

        data: [{
                id: '1',
                name: "父节点1",
                children: [{ id: '1-1', name: "子节点1-1" },
                    { id: '1-2', name: "子节点1-2" },
                    { id: '1-3', name: "父节点1-3" }
                ]
            },
            {
                id: '2',
                name: "父节点2",
                children: [
                    { id: '2-1', name: "子节点2-1" },
                    { id: '2-2', name: "子节点2-2" }
                ]
            }
        ]
    });
});