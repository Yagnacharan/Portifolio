class TrieNode {
  constructor(){
    this.children = {};
    this.isEnd = false;
  }
}

class Trie {
  constructor(){
    this.root = new TrieNode();
  }

  insert(word){
    let node = this.root;
    for(const ch of word){
      if(!node.children[ch]) node.children[ch] = new TrieNode();
      node = node.children[ch];
    }
    node.isEnd = true;
  }

  search(prefix){
    let node = this.root;
    for(const ch of prefix){
      if(!node.children[ch]) return [];
      node = node.children[ch];
    }
    return this.collect(node, prefix);
  }

  collect(node, prefix){
    let results = [];
    if(node.isEnd) results.push(prefix);

    for(const ch in node.children){
      results = results.concat(this.collect(node.children[ch], prefix + ch));
    }
    return results;
  }
}

const words = [
  "admission","admit","admin","advanced","algorithm","analytics","architecture","artificialintelligence",
  "automation","availability","authentication","authorization","api","application","agile","accessibility",

  "backend","binary","blockchain","browser","bandwidth","bigdata","bootstrap","benchmark","buffer","bug",

  "cache","compiler","coding","cloud","cybersecurity","container","concurrency","cryptography","cli","cdn",

  "database","debug","developer","devops","docker","distributed","datawarehouse","datamining","dependency",
  "deployment","designpattern","datastructure","dashboard",

  "engineering","encryption","endpoint","exception","eventloop","elasticity","efficiency","embedded",
  "edgecomputing","ecosystem",

  "frontend","framework","function","filesystem","faulttolerance","firewall","fullstack",

  "git","github","graphql","gateway","garbagecollection","gpu","grpc","gui","globalstate","gitlab",

  "hacker","hashmap","hosting","http","https","hypervisor","heuristic","hardware","hybridcloud",

  "javascript","java","json","kubernetes","kafka","kernel","keyvalue","latency","loadbalancer","logging",
  "linux","machinelearning","microservices","middleware","monitoring","multithreading","mongodb","mysql",

  "network","nodejs","nosql","normalization","neuralnetwork","nginx","nativeapp","oauth","operatingsystem",
  "optimization","orchestration","objectoriented","openapi","programming","python","pipeline","proxy",
  "protocol","parallelism","performance","profiling","react","redis","restapi","routing","reliability",
  "scalability","security","server","software","system","synchronization","storage","streaming","scheduler",
  "testing","typescript","threadpool","tokenization","throughput","telemetry","troubleshooting","ui","ux",
  "virtualization","versioncontrol","validation","web","website","websocket","workflow","wireframe",
  "xml","yaml","zeroTrust","zookeeper","zone","zoom","zip","indexing","ranking","searchengine",
  "autocomplete","invertedindex","pagerank","crawler","parser","token","stemming","lemmatization",
  "queryprocessor","relevance","spellcheck","recommendation","fuzzysearch","vectorsearch","nlp",
  "datascience","deeplearning","reinforcementlearning","computergraphics","imageprocessing","signalprocessing"
];


const trie = new Trie();
words.forEach(w => trie.insert(w));

const input = document.getElementById("input");
const suggestions = document.getElementById("suggestions");

input.addEventListener("input", () => {
  const val = input.value.trim().toLowerCase();
  suggestions.innerHTML = "";

  if(!val) return;

  trie.search(val).slice(0,8).forEach(word => {
    const div = document.createElement("div");
    div.className = "suggestion";
    div.textContent = word;
    div.onclick = () => input.value = word;
    suggestions.appendChild(div);
  });
});
