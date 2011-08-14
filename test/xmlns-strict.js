function Q(p, u, l) { return { prefix: p, uri: u, local: l }}

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
      [ [ "opentag", { name: "root", prefix: "", local: "root", uri: "", attributes: {}, nsattributes: {}, nsbindings: {} } ]

      , [ "attribute", { name: "attr", value: "normal" } ]
      , [ "attributens", { name: "attr", value: "normal", prefix: "", local: "attr", uri: "" } ]
      , [ "opentag", { name: "plain", prefix: "", local: "plain", uri: "", attributes: { "attr": "normal" }, 
                nsattributes: { "attr": { name: "attr", value: "normal", prefix: "", local: "attr", uri: "" } },
                nsbindings: {} } ]
      , [ "closetag", "plain" ]
      
      
      , [ "attribute", { name: "xmlns", value: "uri:default" } ]
      , [ "opennamespace", { prefix: "", uri: "uri:default" } ]
      , [ "attributens", { name: "xmlns", value: "uri:default", prefix: "", local: "xmlns", uri: "uri:default" } ]
      , [ "opentag", { name: "ns1", prefix: "", local: "ns1", uri: "uri:default", attributes: { "xmlns": "uri:default" }, 
                nsattributes: { "xmlns": { name: "xmlns", value: "uri:default", prefix: "", local: "xmlns", uri: "uri:default" } }, 
                nsbindings: { "": "uri:default" } } ]

      , [ "attribute", { name: "attr", value: "normal" } ]
      , [ "attributens", { name: "attr", value: "normal", prefix: "", local: "attr", uri: "uri:default" } ] // XXX default NS shouldn't apply to attrs
      , [ "opentag", { name: "plain", prefix: "", local: "plain", uri: "uri:default", attributes: { "attr": "normal" }, 
                nsattributes: { "attr": { name: "attr", value: "normal", prefix: "", local: "attr", uri: "uri:default" } }, // XXX default NS shouldn't apply to attrs
                nsbindings: {} } ]
                
      , [ "closetag", "plain" ]
      , [ "closetag", "ns1" ]
      , [ "closenamespace", { prefix: "", uri: "uri:default" } ]
      

      , [ "attribute", { name: "xmlns:a", value: "uri:nsa" } ]
      , [ "opennamespace", { prefix: "a", uri: "uri:nsa" } ]
      , [ "attributens", { name: "xmlns:a", value: "uri:nsa", prefix: "xmlns", local: "a", uri: "" } ]
      , [ "opentag", { name: "ns2", prefix: "", local: "ns2", uri: "", attributes: { "xmlns:a": "uri:nsa" }, 
                nsattributes: { "xmlns:a": { name: "xmlns:a", value: "uri:nsa", prefix: "xmlns", local: "a", uri: "" } }, 
                nsbindings: { "a": "uri:nsa" } } ]

      , [ "attribute", { name: "attr", value: "normal" } ]
      , [ "attributens", { name: "attr", value: "normal", prefix: "", local: "attr", uri: "" } ]
      , [ "opentag", { name: "plain", prefix: "", local: "plain", uri: "", attributes: { "attr": "normal" }, 
                nsattributes: { "attr": { name: "attr", value: "normal", prefix: "", local: "attr", uri: "" } },
                nsbindings: {} } ]
      , [ "closetag", "plain" ]
      
      , [ "attribute", { name: "a:attr", value: "namespaced" } ]
      , [ "attributens", { name: "a:attr", value: "namespaced", prefix: "a", local: "attr", uri: "uri:nsa" } ]
      , [ "opentag", { name: "a:ns", prefix: "a", local: "ns", uri: "uri:nsa", attributes: { "a:attr": "namespaced" }, 
                nsattributes: { "a:attr": { name: "a:attr", value: "namespaced", prefix: "a", local: "attr", uri: "uri:nsa" } },
                nsbindings: {} } ]

      , [ "closetag", "a:ns" ]
      , [ "closetag", "ns2" ]
      , [ "closenamespace", { prefix: "a", uri: "uri:nsa" } ]

      , [ "closetag", "root" ]
      ]
    , strict : true
    , opt : { xmlns: true }
    }
  )

