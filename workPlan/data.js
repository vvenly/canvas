var stationDataS={
  "msg": "操作成功",
  "code": 200,
  "data": [
    { "name": "福田A","id": 88, "centerM": 291 },
    { "name": "福田B","id": 89, "centerM": 477 },
    { "name": "车公庙A", "id": 92,"centerM": 3135.7},
    { "name": "车公庙B", "id": 93,  "centerM": 3321.7 },
    { "name": "红树湾南A", "id": 90, "centerM": 9035.761 },
    { "name": "红树湾南B","id": 91,"centerM": 9221.761},
    { "name": "后海A",
      "id": 66,
      "centerM": 12411
    },
    { "name": "后海B",
      "id": 67,
      "centerM": 12597
    },
    { "name": "南山A",
      "id": 62,
      "centerM": 14457.4
    },
    { "name": "南山B",
      "id": 63,
      "centerM": 14643.4
    },
    { "name": "前海湾A",
      "id": 60,
      "centerM": 18329.6
    },
    { "name": "前海湾B",
      "id": 61,
      "centerM": 18515.6
    },
    { "name": "宝安A",
      "id": 70,
      "centerM": 21127
    },
    { "name": "宝安B",
      "id": 71,
      "centerM": 21313
    },
    { "name": "碧海湾A",
      "id": 84,
      "centerM": 24457
    },
    { "name": "碧海湾B",
      "id": 85,
      "centerM": 24643
    },
    { "name": "机场A",
      "id": 72,
      "centerM": 31698
    },
    { "name": "机场B",
      "id": 73,
      "centerM": 31884
    },
    { "name": "机场北A",
      "id": 134,
      "centerM": 34692
    },
    { "name": "机场北B",
      "id": 135,
      "centerM": 34878
    },
    { "name": "福永A",
      "id": 86,
      "centerM": 37653
    },
    { "name": "福永B",
      "id": 87,
      "centerM": 37839
    },
    { "name": "桥头A",
      "id": 132,
      "centerM": 39389.43
    },
    { "name": "桥头B",
      "id": 133,
      "centerM": 39575.43
    },
    { "name": "塘尾A",
      "id": 68,
      "centerM": 41110.38
    },
    { "name": "塘尾B",
      "id": 69,
      "centerM": 41296.38
    },
    { "name": "马安山A",
      "id": 94,
      "centerM": 42841
    },
    {
      "name": "马安山B",
      "id": 95,
      "centerM": 43027
    },
    { "name": "沙井A",
      "id": 80,
      "centerM": 44569.53
    },
    { "name": "沙井B",
      "id": 81,
      "centerM": 44755.53
    },
    { "name": "后亭A",
      "id": 64,
      "centerM": 47007
    },
    { "name": "后亭B",
      "id": 65,
      "centerM": 47193
    },
    { "name": "松岗A",
      "id": 76,
      "centerM": 49325
    },
    { "name": "松岗B",
      "id": 77,
      "centerM": 49511
    },
    { "name": "碧头A",
      "id": 82,
      "centerM": 51266
    },
    { "name": "碧头B",
      "id": 83,
      "centerM": 51452
    }
  ]
}

var planDataSS={
  "msg": "操作成功",
  "code": 200,
  "data": [
    {
      "id":1,
      "planType":"Z","planWorkCode":"N0-123",
      "workTypeCode":"ZA1",
      "workStarDataTime":"2019-11-14 02:30",
      "workEndDataTime":"2019-11-14 03:30",
      "startEndPointId": 88,
      "endEndPointId": 89,
      "lineType": "SX",
      "conflicts":null
    },
    {
      "id":2,
      "planType":"Z","planWorkCode":"N0-223",
      "workTypeCode":"ZB1",
      "workStarDataTime":"2019-11-14 02:40",
      "workEndDataTime":"2019-11-14 04:10",
      "startEndPointId": 92,
      "endEndPointId": 91,
      "lineType": "S",
      "conflicts":[
        {"id":1,"planId":2,"targetPlanId":3,"targetPlanWorkCode":"PlanN-022","ruleType":"1"}
      ]
      // "conflicts":null
    },
    {
      "id":3,
      "planType":"Z","planWorkCode":"N0-323",
      "workTypeCode":"ZC1",
      "workStarDataTime":"2019-11-13 23:30",
      "workEndDataTime":"2019-11-14 01:30",
      "startEndPointId": 93,
      "endEndPointId": 94,
      "lineType": "X",
      "conflicts":[
        {"id":1,"planId":3,"targetPlanId":2,"targetPlanWorkCode":"PlanN-023","ruleType":"2"},
        {"id":2,"planId":3,"targetPlanId":5,"targetPlanWorkCode":"PlanN-025","ruleType":"2"}
      ]
      // "conflicts":null
    },
    {
      "id":4,
      "planType":"Z","planWorkCode":"N0-423",
      "workTypeCode":"ZD1",
      "workStarDataTime":"2019-11-14 04:30",
      "workEndDataTime":"2019-11-14 05:30",
      "startEndPointId": 89,
      "endEndPointId": 91,
      "lineType": "X",
      "conflicts":null
    },
    {
      "id":5,
      "planType":"Z","planWorkCode":"N0-523",
      "workTypeCode":"ZA2",
      "workStarDataTime":"2019-11-14 00:30",
      "workEndDataTime":"2019-11-14 02:33",
      "startEndPointId": 60,
      "endEndPointId": 71,
      "lineType": "S",
      "conflicts":[
        {"id":1,"planId":5,"targetPlanId":3,"targetPlanWorkCode":"PlanN-023","ruleType":"2"}
      ]
      // "conflicts":null
    },
    {
      "id":6,
      "planType":"Z","planWorkCode":"N0-623",
      "workTypeCode":"ZB2",
      "workStarDataTime":"2019-11-14 11:30",
      "workEndDataTime":"2019-11-14 15:30",
      "startEndPointId": 88,
      "endEndPointId": 71,
      "lineType": "S",
      "conflicts":null
    },
  ]
}