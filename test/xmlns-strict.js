
require(__dirname).test
  ( { xml :
      "<root>"+
        "<plain attr='normal'/>"+
        "<ns1 xmlns='uri:default'>"+
          "<plain attr='normal'/>"+
        "</ns1>"+
        "<ns2 xmlns:a='uri:nsa'>"+
          "<plain attr='normal'/>"+
          "<a:ns a:attr='namespaced'/>"+
        "</ns2>"+
      "</root>"

    , expect :
      [ [ "opentag", { name: "root", prefix: "", local: "root", namespace: "", attributes: {}, nsattributes: {}, nsbindings: {} } ]

      , [ "attribute", { name: "attr", value: "normal" } ]
      , [ "attributens", { name: "attr", value: "normal", prefix: "", local: "attr", namespace: "" } ]
      , [ "opentag", { name: "plain", prefix: "", local: "plain", namespace: "", attributes: { "attr": "normal" }, 
                nsattributes: { "attr": { name: "attr", value: "normal", prefix: "", local: "attr", namespace: "" } },
                nsbindings: {} } ]
      , [ "closetag", "plain" ]
      
      
      , [ "attribute", { name: "xmlns", value: "uri:default" } ]
      , [ "opennamespace", { prefix: "", namespace: "uri:default" } ]
      , [ "attributens", { name: "xmlns", value: "uri:default", prefix: "", local: "xmlns", namespace: "uri:default" } ]
      , [ "opentag", { name: "ns1", prefix: "", local: "ns1", namespace: "uri:default", attributes: { "xmlns": "uri:default" }, 
                nsattributes: { "xmlns": { name: "xmlns", value: "uri:default", prefix: "", local: "xmlns", namespace: "uri:default" } }, 
                nsbindings: { "": "uri:default" } } ]

      , [ "attribute", { name: "attr", value: "normal" } ]
      , [ "attributens", { name: "attr", value: "normal", prefix: "", local: "attr", namespace: "uri:default" } ] // XXX default NS shouldn't apply to attrs
      , [ "opentag", { name: "plain", prefix: "", local: "plain", namespace: "uri:default", attributes: { "attr": "normal" }, 
                nsattributes: { "attr": { name: "attr", value: "normal", prefix: "", local: "attr", namespace: "uri:default" } }, // XXX default NS shouldn't apply to attrs
                nsbindings: {} } ]
                
      , [ "closetag", "plain" ]
      , [ "closetag", "ns1" ]
      , [ "closenamespace", { prefix: "", namespace: "uri:default" } ]
      

      , [ "attribute", { name: "xmlns:a", value: "uri:nsa" } ]
      , [ "opennamespace", { prefix: "a", namespace: "uri:nsa" } ]
      , [ "attributens", { name: "xmlns:a", value: "uri:nsa", prefix: "xmlns", local: "a", namespace: "" } ]
      , [ "opentag", { name: "ns2", prefix: "", local: "ns2", namespace: "", attributes: { "xmlns:a": "uri:nsa" }, 
                nsattributes: { "xmlns:a": { name: "xmlns:a", value: "uri:nsa", prefix: "xmlns", local: "a", namespace: "" } }, 
                nsbindings: { "a": "uri:nsa" } } ]

      , [ "attribute", { name: "attr", value: "normal" } ]
      , [ "attributens", { name: "attr", value: "normal", prefix: "", local: "attr", namespace: "" } ]
      , [ "opentag", { name: "plain", prefix: "", local: "plain", namespace: "", attributes: { "attr": "normal" }, 
                nsattributes: { "attr": { name: "attr", value: "normal", prefix: "", local: "attr", namespace: "" } },
                nsbindings: {} } ]
      , [ "closetag", "plain" ]
      
      , [ "attribute", { name: "a:attr", value: "namespaced" } ]
      , [ "attributens", { name: "a:attr", value: "namespaced", prefix: "a", local: "attr", namespace: "uri:nsa" } ]
      , [ "opentag", { name: "a:ns", prefix: "a", local: "ns", namespace: "uri:nsa", attributes: { "a:attr": "namespaced" }, 
                nsattributes: { "a:attr": { name: "a:attr", value: "namespaced", prefix: "a", local: "attr", namespace: "uri:nsa" } },
                nsbindings: {} } ]

      , [ "closetag", "a:ns" ]
      , [ "closetag", "ns2" ]
      , [ "closenamespace", { prefix: "a", namespace: "uri:nsa" } ]

      , [ "closetag", "root" ]
      ]
    , strict : true
    , opt : { xmlns: true }
    }
  )

