!function(e){var l={};function t(i){if(l[i])return l[i].exports;var n=l[i]={i:i,l:!1,exports:{}};return e[i].call(n.exports,n,n.exports,t),n.l=!0,n.exports}t.m=e,t.c=l,t.d=function(e,l,i){t.o(e,l)||Object.defineProperty(e,l,{enumerable:!0,get:i})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,l){if(1&l&&(e=t(e)),8&l)return e;if(4&l&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(t.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&l&&"string"!=typeof e)for(var n in e)t.d(i,n,function(l){return e[l]}.bind(null,n));return i},t.n=function(e){var l=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(l,"a",l),l},t.o=function(e,l){return Object.prototype.hasOwnProperty.call(e,l)},t.p="",t(t.s=3)}([function(e,l){e.exports=class{constructor(e,l){this.x=e,this.y=l}print(){console.log(JSON.stringify(this))}}},function(e,l){var t;t=function(){return this}();try{t=t||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(t=window)}e.exports=t},function(e,l,t){const i=t(0);function n(e){return Math.pow(e,2)}function a(e){return Math.PI*(e/180)}function r(e){return Math.sin(a(e))}function s(e){return Math.cos(a(e))}function o(e){return 0===e.x?0:y(180*Math.atan2(e.y,e.x)/Math.PI)}function y(e){return(e+360)%360}e.exports={rotate:function(e,l){const t=y(o(e)+l),a=function(e){return Math.sqrt(n(e.x)+n(e.y))}(e),u=s(t)*a,h=r(t)*a;return new i(u,h)},translate:function(e,l){return new i(e.x+l.x,e.y+l.y)},sin:r,cos:s}},function(e,l,t){(function(l){const i=t(0),n=t(4),a=t(6),r=t(7),s=t(8);function o(e){var l=0;if(0===e.length)return l;for(var t=0;t<e.length;t++){l=(l<<5)-l+e.charCodeAt(t),l&=l}return l}class y{constructor({rings:e,aliveStates:l,colors:t,startCells:a,startT:r=0,canvasId:s}){this.rings=e,this.aliveStates=l,this.colors=t.map(e=>e.toUpperCase()),this.startCells=a,this.pentaflower=new n({rings:e,aliveStates:l}),a.forEach(e=>{this.pentaflower.setState(e)}),this.prevFills=null,this.fills=this.pentaflower.pentagons.map(e=>e.getState()?this.colors[0]:this.colors[1]),this.t=0,this.canvasId=s,this.hasRenderedCanvas=!1;const o=this.pentaflower.getDimensions();this.fifthX=o.rangeX/5,this.fifthY=o.rangeY/5;const y=new i(o.offset.x,o.offset.y);this.viewXEnd=o.rangeX-2*this.fifthX,this.viewYEnd=o.rangeY-2*this.fifthY,this.points=this.pentaflower.pentagons.map(e=>e.points.reduce((e,l)=>`${e} ${l.x+y.x},${l.y+y.y}`,"")),this.prevFills=this.pentaflower.pentagons.map(e=>e.getState()?t[0]:t[1]);for(let e=0;e<r;e++)this.pentaflower.progress(),this.t++}nextT(){this.pentaflower.progress(),this.t++,this.renderCanvas()}renderInitialCanvas(){document.getElementById(this.canvasId).innerHTML=`      <svg xmlns="http://www.w3.org/2000/svg" width="700px" height="700px" viewBox="${this.fifthX} ${this.fifthY} ${this.viewXEnd} ${this.viewYEnd}" preserveAspectRatio="xMidYMid slice">\n        <rect width="100%" height="100%" x="${this.fifthX}" y="${this.fifthY}" fill="${this.colors[2]}"/>\n        ${this.fills.map((e,l)=>`<polygon points="${this.points[l]}" fill="${e}" id="${this.canvasId}-poly-${l}" />`)}\n      </svg>\n    `}renderCanvas(){this.hasRenderedCanvas||(this.renderInitialCanvas(),this.hasRenderedCanvas=!0),this.fills=this.pentaflower.pentagons.map(e=>e.getState()?this.colors[0]:this.colors[1]),this.fills.map((e,l)=>{if(e!==this.prevFills[l])return{index:l,fill:e}}).filter(e=>!!e).forEach(({index:e,fill:l})=>{document.getElementById(`${this.canvasId}-poly-${e}`).setAttribute("fill",l)}),this.prevFills=this.fills}export(e="pentaflower"){const l=document.createElement("a"),t=new window.Blob([document.getElementById(this.canvasId).getElementsByTagName("svg")[0].outerHTML],{type:"text/plain"});l.href=URL.createObjectURL(t),l.download=`${e}.svg`,l.click()}getName(){const e={colors:this.colors,rings:this.rings,aliveStates:this.aliveStates,startCells:this.startCells,t:this.t},l=this.colors,t={rings:this.rings,aliveStates:this.aliveStates,startCells:this.startCells,t:this.t},i=JSON.stringify(e),n=JSON.stringify(l),y=JSON.stringify(t),u=o(i),h=o(n),g=o(y),c=Math.abs(u)%a.length,d=Math.abs(h)%r.length,f=Math.abs(g)%s.length;return`${a[c]} ${r[d]} ${s[f]}`}}e.exports=y,l.PentaflowerCanvas=y}).call(this,t(1))},function(e,l,t){(function(l){const{generateRegularPolygon:i}=t(5),n=t(0),{rotate:a}=t(2);function r(e,l){return e.map(e=>new n(e.x+l.x,e.y+l.y))}function s(e,l,t){let n=i(e);return l&&(n=function(e,l){return e.map(e=>a(e,l))}(n,l)),t&&(n=r(n,t)),n}function o(e,l){return new n(e.x-l.x,e.y-l.y)}const y={a:[1,3],b:[0,2],c:[4,1],d:[2,1],e:[1,0],f:[2,3],g:[1,2],h:[0,1],i:[3,1],j:[2,0]},u=[{1:{firstNeighbor:"b",neighbor:"a"},2:{firstNeighbor:"f",neighbor:"g"}},{1:{firstNeighbor:"c",neighbor:"b"},2:{firstNeighbor:"g",neighbor:"h"}},{1:{firstNeighbor:"d",neighbor:"c"},2:{firstNeighbor:"h",neighbor:"i"}},{1:{firstNeighbor:"e",neighbor:"d"},2:{firstNeighbor:"i",neighbor:"j"}},{1:{firstNeighbor:"a",neighbor:"e"},2:{firstNeighbor:"j",neighbor:"f"}}],h=s(5,null,new n(-.5,-.5)),g=s(5,36,new n(-.5,-.5));class c{constructor(e,l,t,i){this.points=e,this.type=l,this.level=t,this.index=i,this.quadrant=Math.ceil(i/t),this.subQuad=Math.ceil(2*i/t)%10,this.isFirst=i%t==0,this.isLast=i%t==t-1;const n=this.subQuad%2==0;this.altType="2"===l&&n||"1"===l&&!n?"a":"b",this.isLastInSub=i%(t/2)==0,this.hasTwoNeighbors="b"===this.altType||"a"===this.altType&&this.isLastInSub,this.neighbors=[],this.nextState=!1,this.state=!1}getState(){return this.state}addNeighbor(e){const l=y[e],t="1"===this.type?g:h;return r(t,o(this.points[l[0]],t[l[1]]))}toSVG(e){return pointsToSVG(this.points,this.getColor(),new n(e.x,e.y))}}class d{constructor({rings:e=50,aliveStates:l=[1]}){this.aliveStates=l;const t=h,i=r(g,o(t[1],g[0])),n=r(g,o(t[1],g[3])),a=r(g,o(t[0],g[2])),s=r(g,o(t[4],g[1])),y=r(g,o(t[2],g[1])),d=[new c(t,"1",0,0),new c(n,"2",1,0),new c(a,"2",1,1),new c(s,"2",1,2),new c(y,"2",1,3),new c(i,"2",1,4)],f=d[0];for(var p=1;p<=5;p++)d[p].neighbors.push(f),f.neighbors.push(d[p]);function S(e){return 0===e?1:5*e+S(e-1)}!function e(l,t,i){if(i<t){const a=S(i-1),r=S(i),s=i%2==0?"1":"2",o="1"===s?"2":"1",y=[];for(var n=a;n<r;n++)y.push(n);let h=0;y.forEach((e,t)=>{const n=Math.floor(t/i),r=t%i==i-1;if("2"===s&&t%i==0){const t=u[n][s].firstNeighbor,a=l[e].addNeighbor(t),r=new c(a,o,i+1,h);r.neighbors.push(l[e]),l[e].neighbors.push(r),l.push(r),h++}const y=u[n][s].neighbor,g=l[e].addNeighbor(y),d=new c(g,o,i+1,h);d.neighbors.push(l[e]),l.push(d),l[e].neighbors.push(d);const f=l[e-1],p=l[e+1];if(!f.hasTwoNeighbors||f.isLast||f.isFirst||"1"!==f.type?!p.hasTwoNeighbors||p.isLast||p.isFirst||"2"!==p.type||(d.neighbors.push(p),p.neighbors.push(d)):(d.neighbors.push(f),f.neighbors.push(d)),h++,"1"===s&&r){const t=u[n][s].firstNeighbor,r=l[e].addNeighbor(t),y=new c(r,o,i+1,h);y.neighbors.push(l[e]),l[e].neighbors.push(y),l.push(y);let g=l[e+1];g.hasTwoNeighbors&&(g.level===i?(y.neighbors.push(g),g.neighbors.push(y)):(g=l[a],y.neighbors.push(g),g.neighbors.push(y))),h++}}),e(l,t,i+1)}}(d,e,1),this.pentagons=d}setState(e){this.pentagons[e].state=!0}progress(){this.pentagons;this.pentagons.forEach((e,l)=>{const t=e.neighbors.filter(e=>e.state).length;6===l&&3!==e.neighbors.length&&console.log(e.neighbors),e.nextState=this.aliveStates.includes(t)}),this.pentagons.forEach(e=>{e.state=e.nextState})}getDimensions(){const e=this.pentagons.map(e=>e.points),l=e.map(e=>Math.min(...e.map(e=>e.x))),t=e.map(e=>Math.min(...e.map(e=>e.y))),i=e.map(e=>Math.max(...e.map(e=>e.x))),a=e.map(e=>Math.max(...e.map(e=>e.y))),r=Math.min(...l),s=Math.min(...t),o=Math.max(...i)-r,y=Math.max(...a)-s;return{offset:new n(-r,-s),rangeX:o,rangeY:y}}}e.exports=d,l.Pentaflower=d}).call(this,t(1))},function(e,l,t){const i=t(0),{rotate:n,translate:a,sin:r,cos:s}=t(2);e.exports={generateRegularPolygon:function(e){if(e<3)throw new Error("Polygon must have 3 or more sides.");let l=[];l.push(new i(1,0)),l.push(new i(0,0));const t=function(e){return 180*(e-2)/e}(e),o=t+180;l.push(new i(s(t),r(t)));const y=function(e,l){return t=>{const i=n(t,e);return a(i,l)}}(o,new i(l[2].x,l[2].y)),u=e-3;for(let e=0;e<u;e++)l.push(y(l[l.length-1]));return l}}},function(e){e.exports=["Abnormally","Absentmindedly","Accidentally","Actually","Adventurously","Afterwards","Almost","Always","Annually","Anxiously","Arrogantly","Awkwardly","Bashfully","Beautifully","Bitterly","Bleakly","Blindly","Blissfully","Boastfully","Boldly","Bravely","Briefly","Brightly","Briskly","Broadly","Busily","Calmly","Carefully","Carelessly","Cautiously","Certainly","Cheerfully","Clearly","Cleverly","Closely","Coaxingly","Colorfully","Commonly","Continually","Coolly","Correctly","Courageously","Crossly","Cruelly","Curiously","Daily","Daintily","Dearly","Deceivingly","Deeply","Defiantly","Deliberately","Delightfully","Diligently","Dimly","Doubtfully","Dreamily","Easily","Elegantly","Energetically","Enormously","Enthusiastically","Equally","Especially","Even","Evenly","Eventually","Exactly","Excitedly","Extremely","Fairly","Faithfully","Famously","Far","Fast","Fatally","Ferociously","Fervently","Fiercely","Fondly","Foolishly","Fortunately","Frankly","Frantically","Freely","Frenetically","Frightfully","Fully","Furiously","Generally","Generously","Gently","Gladly","Gleefully","Gracefully","Gratefully","Greatly","Greedily","Happily","Hastily","Healthily","Heavily","Helpfully","Helplessly","Highly","Honestly","Hopelessly","Hourly","Hungrily","Immediately","Innocently","Inquisitively","Instantly","Intensely","Intently","Interestingly","Inwardly","Irritably","Jaggedly","Jealously","Jovially","Joyfully","Joyously","Jubilantly","Judgmentally","Justly","Keenly","Kiddingly","Kindheartedly","Kindly","Knavishly","Knowingly","Knowledgeably","Kookily","Lazily","Lightly","Likely","Limply","Lively","Loftily","Longingly","Loosely","Loudly","Lovingly","Loyally","Madly","Majestically","Meaningfully","Mechanically","Merrily","Miserably","Mockingly","Monthly","More","Mortally","Mostly","Mysteriously","Naturally","Hopelessly","Hourly","Hungrily","Immediately","Innocently","Inquisitively","Instantly","Intensely","Intently","Interestingly","Inwardly","Irritably","Jaggedly","Jealously","Jovially","Joyfully","Joyously","Jubilantly","Judgmentally","Justly","Keenly","Kiddingly","Kindheartedly","Kindly","Knavishly","Knowingly","Knowledgeably","Kookily","Lazily","Less","Lightly","Likely","Limply","Lively","Loftily","Longingly","Loosely","Loudly","Lovingly","Loyally","Madly","Majestically","Meaningfully","Mechanically","Merrily","Miserably","Mockingly","Monthly","More","Mortally","Mostly","Mysteriously","Naturally","Nearly","Neatly","Nervously","Never","Nicely","Noisily","Not","Obediently","Obnoxiously","Oddly","Offensively","Officially","Often","Only","Openly","Optimistically","Overconfidently","Painfully","Partially","Patiently","Perfectly","Physically","Playfully","Politely","Poorly","Positively","Potentially","Powerfully","Promptly","Properly","Punctually","Quaintly","Queasily","Queerly","Questionably","Quicker","Quickly","Quietly","Quirkily","Quizzically","Randomly","Rapidly","Rarely","Readily","Really","Reassuringly","Recklessly","Regularly","Reluctantly","Repeatedly","Reproachfully","Restfully","Righteously","Rightfully","Rigidly","Roughly","Rudely","Safely","Scarcely","Scarily","Searchingly","Sedately","Seemingly","Seldom","Selfishly","Separately","Seriously","Shakily","Sharply","Sheepishly","Shrilly","Shyly","Silently","Sleepily","Slowly","Smoothly","Softly","Solemnly","Solidly","Sometimes","Soon","Speedily","Stealthily","Sternly","Strictly","Successfully","Suddenly","Supposedly","Surprisingly","Suspiciously","Sweetly","Swiftly","Sympathetically","Tenderly","Tensely","Terribly","Thankfully","Thoroughly","Thoughtfully","Tightly","Tomorrow","Too","Tremendously","Triumphantly","Truly","Truthfully","Rightfully","Scarcely","Searchingly","Sedately","Seemingly","Selfishly","Separately","Seriously","Sheepishly","Smoothly","Solemnly","Sometimes","Speedily","Stealthily","Successfully","Suddenly","Supposedly","Surprisingly","Suspiciously","Sympathetically","Tenderly","Thankfully","Thoroughly","Thoughtfully","Tomorrow","Tremendously","Triumphantly","Truthfully","Ultimately","Unabashedly","Unaccountably","Unbearably","Unethically","Unexpectedly","Unfortunately","Unimpressively","Unnaturally","Unnecessarily","Upbeat","Upright","Upward","Urgently","Usefully","Uselessly","Usually","Utterly","Vacantly","Vaguely","Vainly","Valiantly","Vastly","Verbally","Very","Viciously","Victoriously","Violently","Vivaciously","Voluntarily","Warmly","Weakly","Wearily","Well","Wetly","Wholly","Wildly","Willfully","Wisely","Woefully","Wonderfully","Worriedly","Wrongly","Yawningly","Yearly","Yearningly","Yesterday","Yieldingly","Youthfully","Zealously","Zestfully","Zestily"]},function(e){e.exports=["Afraid","Agreeable","Amused","Ancient","Angry","Annoyed","Anxious","Arrogant","Ashamed","Average","Awful","Bad","Beautiful","Better","Big","Bitter","Black","Blue","Boiling","Brave","Breezy","Brief","Bright","Broad","Broken","Bumpy","Calm","Careful","Charming","Cheerful","Chilly","Clumsy","Cold","Colossal","Combative","Comfortable","Confused","Cooing","Cool","Cooperative","Courageous","Crazy","Creepy","Cruel","Cuddly","Curly","Curved","Damp","Dangerous","Deafening","Deep","Defiant","Delicious","Delightful","Depressed","Determined","Dirty","Disgusted","Disturbed","Dizzy","Dry","Dull","Dusty","Eager","Early","Elated","Embarrassed","Empty","Encouraging","Energetic","Enthusiastic","Envious","Evil","Excited","Exuberant","Faint","Fair","Faithful","Fantastic","Fast","Fat","Few","Fierce","Filthy","Fine","Flaky","Flat","Fluffy","Foolish","Forlorn","Frail","Frantic","Fresh","Friendly","Frightened","Funny","Fuzzy","Gentle","Giant","Gigantic","Good","Greasy","Great","Green","Grieving","Grubby","Grumpy","Handsome","Happy","Hard","Harsh","Healthy","Heavy","Helpful","Helpless","High","Hilarious","Hissing","Hollow","Homeless","Horrible","Hot","Huge","Hungry","Hurt","Hushed","Husky","Icy","Ill","Immense","Itchy","Jealous","Jittery","Jolly","Juicy","Kind","Large","Late","Lazy","Light","Little","Lively","Lonely","Long","Loose","Loud","Lovely","Low","Lucky","Magnificent","Many","Massive","Melodic","Melted","Mighty","Miniature","Moaning","Modern","Mute","Mysterious","Narrow","Nasty","Naughty","Nervous","New","Nice","Nosy","Numerous","Nutty","Obedient","Obnoxious","Odd","Old","Orange","Ordinary","Outrageous","Panicky","Perfect","Petite","Plastic","Pleasant","Precious","Pretty","Prickly","Proud","Puny","Purple","Purring","Quaint","Quick","Quickest","Quiet","Rainy","Rapid","Rare","Raspy","Ratty","Red","Relieved","Resonant","Ripe","Roasted","Robust","Rotten","Rough","Round","Sad","Salty","Scary","Scattered","Scrawny","Screeching","Selfish","Shaggy","Shaky","Shallow","Sharp","Shivering","Short","Shrill","Silent","Silky","Silly","Skinny","Slimy","Slippery","Slow","Small","Smart","Smiling","Smooth","Soft","Solid","Sore","Sour","Spicy","Splendid","Spotty","Square","Squealing","Stale","Steady","Steep","Sticky","Stingy","Straight","Strange","Striped","Strong","Stupendous","Sweet","Swift","Tall","Tame","Tan","Tart","Tasteless","Tasty","Tender","Tender","Tense","Terrible","Testy","Thirsty","Thoughtful","Thoughtless","Thundering","Tight","Tiny","Tired","Tough","Tricky","Troubled","Ugliest","Ugly","Uneven","Upset","Uptight","Vast","Victorious","Vivacious","Voiceless","Wasteful","Watery","Weak","Weary","Wet","Whispering","Wicked","Wide","Witty","Wonderful","Wooden","Worried","Yellow","Young","Yummy","Zany"]},function(e){e.exports=["Aconite","Ageratum","Allium","Alstromeria","Amaryllis","Anemone","Angelica","Angelonia","Artemisia","Aster","Astilbe","Aubrieta","Alyssum","Balloon Flower","Balsam","Baneberry","Basket of Gold","Bee Balm","Begonia","Bellflower","Bergenia","Blackeyed Susan","Bleeding Heart","Bloodroot","Boneset","Browalia","Bugleweed","Bugloss","Buttercup","Butterfly Weed","Caladium","Calendula","California Poppy","Canna","Canterbury Bells","Cardinal Flower","Carnation","Castor Bean","Catmint","Celosia","Chives","Chrysanthemum","Clary Sage","Cleome","Cockscomb","Coleus","Columbine","Comfrey","Coneflower","Coreopsis","Corydalis","Cosmos","Crocus","Crown Imperial","Cushion Spurge","Cyclamen","Daffodil","Dahlia","Daisy","Dame’s Rocket","Delphinium","Dianthus","Diascia","Dusty Miller","Dutchman’s Breeches","Epimedium","Evergreen Candytuft","Fennel","Fountain Grass","Foxglove","Gaillardia","Gardenias","Gas Plant","Gaura","Gazania","Geranium","Geum","Globe Thistle","Glory of the Snow","Goatsbeard","Golden Marguerite","Gomphrena","Helconia","Heliotrope","Hepatica","Hibiscus","Hollyhock","Hosta","Hyacinth","Hydrangea","Hyssop","Impatiens","Iris","Jack-in-the-Pulpit","Jacob’s Ladder","Lady’s Mantle","Lantana","Lavender","Lavender Cotton","Leadwort","Lemon Balm","Lily","Lily of the Valley","Lisianthus","Lobelia","Lupine","Maiden Pink","Malva","Marigold","Mazus","Mirabilis","Moonflower","Morning Glory","Nasturtium","Nierembergia","Orchid","Osteospermum","Pansy","Pasque","Pearly Everlasting","Pentas","Peony","Perennial Flax","Periwinkle","Petunia","Pincushion Flower","Polka Dot Plant","Primrose","Ranunculus","Red Valerian","Rhododendron","Rock Soapwort","Rose","Rue","Sanvitalia","Scabiosa","Scarlet Sage","Sea Holly","Sea Lavender","Sea Thrift","Shirley Poppy","Shooting Star","Silvermound","Skunk Cabbage","Snapdragon","Snow in Summer","Snowdrop","Solomon’s Seal","Spring Snowflake","Streptocarpus","Summer Savory","Sunflower","Sweet Woodruff","Tansy","Thunbergia","Tithonia","Torenia","Trillium","Tulip","Verbena","Violet","Virginia Bluebell","Wild Senna","Windflower","Wisteria","Yarrow","Yellow Archangel","Yellow Loosestrife","Zinnia"]}]);