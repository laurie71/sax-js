
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
      [ [ "opentag", { name: "root", namespace: "", prefix: "", local: "root",
            attributes: {}, bindings: [] } ]

      , [ "attribute", { name: "attr", value: "normal", namespace: "", prefix: "", local: "attr" } ]
      , [ "opentag", { name: "plain", namespace: "", prefix: "", local: "plain", 
            attributes: { "attr": { name: "attr", value: "normal", namespace: "", prefix: "", local: "attr" } }, 
            bindings: [] } ]
      , [ "closetag", "plain" ]
      
      , [ "bindnamespace", { prefix: "", namespace: "uri:default" } ]
      
      , [ "attribute", { name: "xmlns", value: "uri:default", namespace: "", prefix: "", local: "xmlns" } ]
      , [ "opentag", { name: "ns1", namespace: "uri:default", prefix: "", local: "ns1", 
            attributes: { "xmlns": { name: "xmlns", value: "uri:default", namespace: "", prefix: "", local: "xmlns" } }, 
            bindings: [ "" ] } ]

      , [ "attribute", { name: "attr", value: "normal", namespace: "", prefix: "", local: "attr" } ]
      , [ "opentag", { name: "plain", namespace: "uri:default", prefix: "", local: "plain", 
            attributes: { "attr": { name: "attr", value: "normal", namespace: "", prefix: "", local: "attr" } },
            bindings: [] } ]
      , [ "closetag", "plain" ]

      , [ "closetag", "ns1" ]

      , [ "unbindnamespace", { prefix: "", namespace: "uri:default" } ]
      
      , [ "bindnamespace", { prefix: "a", namespace: "uri:nsa" } ]
      
      , [ "attribute", { name: "xmlns:a", value: "uri:nsa", namespace: "", prefix: "xmlns", local: "a" } ] // FIXME should probably have xmlns namespace (http://www.w3.org/2000/xmlns/)
      , [ "opentag", { name: "ns2", namespace: "", prefix: "", local: "ns2", 
            attributes: { "xmlns:a": { name: "xmlns:a", value: "uri:nsa", namespace: "", prefix: "xmlns", local: "a" } },  // FIXME should probably have xmlns namespace (http://www.w3.org/2000/xmlns/)
            bindings: [ "a" ] } ]

      , [ "attribute", { name: "attr", value: "normal", namespace: "", prefix: "", local: "attr" } ]
      , [ "opentag", { name: "plain", namespace: "", prefix: "", local: "plain", 
            attributes: { "attr": { name: "attr", value: "normal", namespace: "", prefix: "", local: "attr" } },
            bindings: [] } ]
      , [ "closetag", "plain" ]
      
      , [ "attribute", { name: "a:attr", value: "namespaced", namespace: "uri:nsa", prefix: "a", local: "attr" } ]
      , [ "opentag", { name: "a:ns", namespace: "uri:nsa", prefix: "a", local: "ns", 
            attributes: { "a:attr": { name: "a:attr", value: "namespaced", namespace: "uri:nsa", prefix: "a", local: "attr" } },
            bindings: [] } ]
      , [ "closetag", "a:ns" ]

      , [ "closetag", "ns2" ]

      , [ "unbindnamespace", { prefix: "a", namespace: "uri:nsa" } ]

      , [ "closetag", "root" ]
      ]
    , strict : true
    , opt : { xmlns: true }
    }
  )

