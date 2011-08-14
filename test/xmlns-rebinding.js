
require(__dirname).test
  ( { xml :
      "<root xmlns:x='x1' xmlns:y='y1' x:a='x1' y:a='y1'>"+
        "<rebind xmlns:x='x2'>"+
          "<check x:a='x2' y:a='y1'/>"+
        "</rebind>"+
        "<check x:a='x1' y:a='y1'/>"+
      "</root>"

    , expect :
      [ [ "bindnamespace", { prefix: "x", namespace: "x1" } ]
      , [ "bindnamespace", { prefix: "y", namespace: "y1" } ]
      , [ "attribute", { name: "xmlns:x", value: "x1", namespace: "", prefix: "xmlns", local: "x" } ]
      , [ "attribute", { name: "xmlns:y", value: "y1", namespace: "", prefix: "xmlns", local: "y" } ]
      , [ "attribute", { name: "x:a", value: "x1", namespace: "x1", prefix: "x", local: "a" } ]
      , [ "attribute", { name: "y:a", value: "y1", namespace: "y1", prefix: "y", local: "a" } ]
      , [ "opentag", { name: "root", namespace: "", prefix: "", local: "root",
            attributes: { "xmlns:x": { name: "xmlns:x", value: "x1", namespace: "", prefix: "xmlns", local: "x" }
                        , "xmlns:y": { name: "xmlns:y", value: "y1", namespace: "", prefix: "xmlns", local: "y" }
                        , "x:a": { name: "x:a", value: "x1", namespace: "x1", prefix: "x", local: "a" }
                        , "y:a": { name: "y:a", value: "y1", namespace: "y1", prefix: "y", local: "a" } }, 
            bindings: [ "x", "y" ] } ]

      , [ "bindnamespace", { prefix: "x", namespace: "x2" } ]
      , [ "attribute", { name: "xmlns:x", value: "x2", namespace: "", prefix: "xmlns", local: "x" } ]
      , [ "opentag", { name: "rebind", namespace: "", prefix: "", local: "rebind", 
            attributes: { "xmlns:x": { name: "xmlns:x", value: "x2", namespace: "", prefix: "xmlns", local: "x" } }, 
            bindings: [ "x" ] } ]
      
      , [ "attribute", { name: "x:a", value: "x2", namespace: "x2", prefix: "x", local: "a" } ]
      , [ "attribute", { name: "y:a", value: "y1", namespace: "y1", prefix: "y", local: "a" } ]
      , [ "opentag", { name: "check", namespace: "", prefix: "", local: "check", 
            attributes: { "x:a": { name: "x:a", value: "x2", namespace: "x2", prefix: "x", local: "a" } 
                        , "y:a": { name: "y:a", value: "y1", namespace: "y1", prefix: "y", local: "a" } },
            bindings: [] } ]

      , [ "closetag", "check" ]

      , [ "closetag", "rebind" ]
      , [ "unbindnamespace", { prefix: "x", namespace: "x2" } ]

      , [ "attribute", { name: "x:a", value: "x1", namespace: "x1", prefix: "x", local: "a" } ]
      , [ "attribute", { name: "y:a", value: "y1", namespace: "y1", prefix: "y", local: "a" } ]
      , [ "opentag", { name: "check", namespace: "", prefix: "", local: "check", 
            attributes: { "x:a": { name: "x:a", value: "x1", namespace: "x1", prefix: "x", local: "a" } 
                        , "y:a": { name: "y:a", value: "y1", namespace: "y1", prefix: "y", local: "a" } },
            bindings: [] } ]
      , [ "closetag", "check" ]
      
      , [ "closetag", "root" ]
      , [ "unbindnamespace", { prefix: "y", namespace: "y1" } ]
      , [ "unbindnamespace", { prefix: "x", namespace: "x1" } ]
      ]
    , strict : true
    , opt : { xmlns: true }
    }
  )

