from ..models import Question, User, db, SCHEMA, environment, Tag
from flask import jsonify

def seed_questions():
  user1 = User.query.filter(User.username == 'Demo1').one()
  user2 = User.query.filter(User.username == 'Demo2').one()
  user3 = User.query.filter(User.username == 'Demo3').one()

  body1 = r"""{"blocks":[{"key":"er6qa","text":"So in C++ there is now make_from_tuple as:","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"34ans","text":"T obj = std::make_from_tuple<T>( { Args... args } ); // args represents a tuple","type":"code-block","depth":0,"inlineStyleRanges":[{"offset":0,"length":79,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"3g0hl","text":"but how would one do:","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"218co","text":"T* obj = std::make_new_from_tuple<T*>( { Args... args } );","type":"code-block","depth":0,"inlineStyleRanges":[{"offset":0,"length":58,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"9dp2v","text":"There is make_shared and make_unique but neither of those takes a tuple (and I'm not sure how one would extract the arguments from the tuple if that is the direction to go, as you can always make_unique then release if you want the raw pointer).","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"b89fe","text":"Very simple example 1:","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"35cm4","text":"struct A\n{\n    int i_; double d_; std::string s_;\n\n    A( int i, double d, const std::string& s ) : i_(i), d_(d), s_(s) {}\n};\n\nauto aTuple = std::make_tuple( 1, 1.5, std::string(\"Hello\") );","type":"code-block","depth":0,"inlineStyleRanges":[{"offset":0,"length":189,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"qrlv","text":"For a more complex example, if the tuple contains a unique_ptr you want to forward, I will want that to work too.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}"""
  body2 = r"""{"blocks":[{"key":"bphko","text":"My understanding of yield from is that it is similar to yielding every item from an iterable. Yet, I observe the different behavior in the following example.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":20,"length":10,"style":"CODE"},{"offset":56,"length":5,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"2d285","text":"I have Class1","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":7,"length":6,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"6roac","text":"class Class1:\n    def __init__(self, gen):\n        self.gen = gen\n        \n    def __iter__(self):\n        for el in self.gen:\n            yield el","type":"code-block","depth":0,"inlineStyleRanges":[{"offset":0,"length":147,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"dud09","text":"and Class2 that different only in replacing yield in for loop with yield from","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":44,"length":5,"style":"CODE"},{"offset":67,"length":10,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"7n43h","text":"class Class2:\n    def __init__(self, gen):\n        self.gen = gen\n        \n    def __iter__(self):\n        yield from self.gen","type":"code-block","depth":0,"inlineStyleRanges":[{"offset":0,"length":126,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"7odeh","text":"The code below reads the first element from an instance of a given class and then reads the rest in a for loop:","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6ss1k","text":"a = Class1((i for i in range(3)))\nprint(next(iter(a)))\nfor el in iter(a):\n    print(el)","type":"code-block","depth":0,"inlineStyleRanges":[{"offset":0,"length":87,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"37jgg","text":"This produces different outputs for Class1 and Class2. For Class1 the output is","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":36,"length":6,"style":"CODE"},{"offset":47,"length":6,"style":"CODE"},{"offset":59,"length":6,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"87sfj","text":"0\n1\n2","type":"code-block","depth":0,"inlineStyleRanges":[{"offset":0,"length":5,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"8q01g","text":"and for Class2 the output is","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":8,"length":6,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"cq8gn","text":"0","type":"code-block","depth":0,"inlineStyleRanges":[{"offset":0,"length":1,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"bpmks","text":"What is the mechanism behind yield from that produces different behavior?","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":29,"length":10,"style":"CODE"}],"entityRanges":[],"data":{}}],"entityMap":{}}"""
  body3 = r"""{"blocks":[{"key":"62r2","text":"I am using numpy==1.24.0. On running this sample code line:","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":11,"length":13,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"7njso","text":"import numpy as np\nnum = np.float(3)","type":"code-block","depth":0,"inlineStyleRanges":[{"offset":0,"length":36,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"cfbem","text":"I am getting this error:","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"eerea","text":"Traceback (most recent call last):   File \"<stdin>\", line 1, in <module>   File \"/home/ubuntu/.local/lib/python3.8/site-packages/numpy/__init__.py\", line 284, in __getattr__\n    raise AttributeError(\"module {!r} has no attribute \" AttributeError: module 'numpy' has no attribute 'float'","type":"code-block","depth":0,"inlineStyleRanges":[{"offset":0,"length":286,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"a3d67","text":"Please help me on this.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}"""
  body4 = r"""{"blocks":[{"key":"5k81h","text":"According to §6.3.2.3 ¶3 of the C11 standard, a null pointer constant in C can be defined by an implementation as either the integer constant expression 0 or such an expression cast to void *. In C the null pointer constant is defined by the NULL macro.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":153,"length":1,"style":"CODE"},{"offset":185,"length":6,"style":"CODE"},{"offset":242,"length":4,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"6nj2b","text":"My implementation (GCC 9.4.0) defines NULL in stddef.h in the following ways:","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":38,"length":4,"style":"CODE"},{"offset":46,"length":8,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"b7jkq","text":"#define NULL ((void *)0)\n#define NULL 0","type":"code-block","depth":0,"inlineStyleRanges":[{"offset":0,"length":39,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"3lof9","text":"Why are both of the above expressions considered semantically equivalent in the context of NULL? More specifically, why do there exist two ways of expressing the same concept rather than one?","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":91,"length":4,"style":"CODE"}],"entityRanges":[],"data":{}}],"entityMap":{}}"""
  body5 = r"""{"blocks":[{"key":"a8jht","text":"What is the difference between the 2? __INT_MAX__ is defined without adding a library as far as I know and INT_MAX is defined in limits.h but when I include the library INT_MAX gets expanded to __INT_MAX__ either way (or so does VSCode say). Why would I ever use the limits.h one when it gets expanded to the other one?","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":38,"length":11,"style":"CODE"},{"offset":107,"length":7,"style":"CODE"},{"offset":129,"length":8,"style":"CODE"},{"offset":169,"length":7,"style":"CODE"},{"offset":194,"length":11,"style":"CODE"},{"offset":267,"length":8,"style":"CODE"}],"entityRanges":[],"data":{}}],"entityMap":{}}"""
  body6 = r"""{"blocks":[{"key":"d2cbf","text":"After a fresh install I could clone the repository, make changes and commits, but when I try to push I get the following warning","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"auhab","text":"warning: could not find UI helper 'GitHub.UI'","type":"code-block","depth":0,"inlineStyleRanges":[{"offset":0,"length":45,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"ecdf0","text":"After this, the process seems to still be running but gets stuck until","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"86crl","text":"I press Ctrl+C it.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"arbb9","text":"I couldn't find this error online.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"2sgia","text":"I can push from GitHub Desktop","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}"""
  body7 = r"""{"blocks":[{"key":"2dvu2","text":"I'm a very experienced C programmer, but recently I came across some code on a mainframe that has a local variable. This is in a simple C function that declares this variable, and then strcpy / strcats two strings into it, and then tries an fopen.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":185,"length":6,"style":"CODE"},{"offset":194,"length":6,"style":"CODE"},{"offset":241,"length":5,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"94odq","text":"char foo(|10|);","type":"code-block","depth":0,"inlineStyleRanges":[{"offset":0,"length":15,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"1eash","text":"This code is very old. Possibly even K&R C old. I'm wondering if this is some obscure compiler extension or an adaptation to a keyboard that doesn't have [] or something like that.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"6usp7","text":"Anyone know if this declaration is 'special'?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"4a3eq","text":"This is a standard Z/OS mainframe. I'm not sure what compiler is used.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}"""
  body8 = r"""{"blocks":[{"key":"6temp","text":"I've been finding a strange behaviour of log functions in C++ and numpy about the behaviour of log function handling complex infinite numbers. Specifically, log(inf + inf * 1j) equals (inf + 0.785398j) when I expect it to be (inf + nan * 1j).","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":41,"length":3,"style":"CODE"},{"offset":95,"length":3,"style":"CODE"},{"offset":157,"length":19,"style":"CODE"},{"offset":184,"length":17,"style":"CODE"},{"offset":225,"length":16,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"3srkv","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"adbci","text":"When taking the log of a complex number, the real part is the log of the absolute value of the input and the imaginary part is the phase of the input. Returning 0.785398 as the imaginary part of log(inf + inf * 1j) means it assumes the infs in the real and the imaginary part have the same length. This assumption does not seem to be consistent with other calculation, for example, inf - inf == nan, inf / inf == nan which assumes 2 infs do not necessarily have the same values.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":195,"length":19,"style":"CODE"},{"offset":236,"length":3,"style":"CODE"},{"offset":382,"length":16,"style":"CODE"},{"offset":400,"length":16,"style":"CODE"},{"offset":433,"length":3,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"2vs7c","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"7cl2r","text":"Why is the assumption for log(inf + inf * 1j) different?","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":26,"length":19,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"1o3vs","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"97sp2","text":"Reproducing C++ code:","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"ba54k","text":"#include <complex>\n#include <limits>\n#include <iostream>\nint main() {\n    double inf = std::numeric_limits<double>::infinity();\n    std::complex<double> b(inf, inf);\n    std::complex<double> c = std::log(b);\n    std::cout << c << \"\\n\";\n}","type":"code-block","depth":0,"inlineStyleRanges":[{"offset":0,"length":237,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"fdhll","text":"Reproducing Python code (numpy):","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"kqfc","text":"import numpy as np\n\na = complex(float('inf'), float('inf'))\nprint(np.log(a))","type":"code-block","depth":0,"inlineStyleRanges":[{"offset":0,"length":76,"style":"CODE"}],"entityRanges":[],"data":{}}],"entityMap":{}}"""
  body9 = r"""{"blocks":[{"key":"3222n","text":"I need help with creating a function to return the elements that are only present in one of 3 arrays, for example","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"8uo48","text":"let arr1 = ['a', 'b', 'c', 'a', 'b']\nlet arr2 = ['a', 'd', 'b', 'c']\nlet arr3 = ['f', 'c', 'a']","type":"code-block","depth":0,"inlineStyleRanges":[{"offset":0,"length":95,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"7rhdt","text":"In the three arrays above, 'd' and 'f' are found only in one of the arrays (arr2 and arr3), I need to return them.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"8n0io","text":"['d','f']","type":"code-block","depth":0,"inlineStyleRanges":[{"offset":0,"length":9,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"4hcb1","text":"The arrays can be of different sizes and the returned elements must not be duplicated.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"97o4u","text":"I tried to find better alternatives, but I failed and just went with the brute force approach, looping through each array and checking if the element exists in the other two arrays, but obviously, it's really slow and hard to read.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":202,"length":6,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"e4ftc","text":"function elementsInOnlyOneArr(a1, a2, a3) {\n\n  let myArr = [];\n\n  for(let el of a1){\n    if(a2.includes(el) == false && a3.includes(el) == false && myArr.includes(el) == false){\n      myArr.push(el);\n    }\n  }\n\n  for(let el of a2){\n    if(a1.includes(el) == false && a3.includes(el) == false && myArr.includes(el) == false){\n      myArr.push(el);\n    }\n  }\n\n  for(let el of a3){\n    if(a2.includes(el) == false && a1.includes(el) == false && myArr.includes(el) == false){\n      myArr.push(el);\n    }\n  }\n\n\n  return myArr;\n}","type":"code-block","depth":0,"inlineStyleRanges":[{"offset":0,"length":523,"style":"CODE"}],"entityRanges":[],"data":{}}],"entityMap":{}}"""
  body10 = r"""{"blocks":[{"key":"28kdk","text":"Can't deploy firebase functions. I have two project aliases, its working fine for the first project (dev), but not for the second (prod).","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"8ujp1","text":"\nWhenever I write firebase deploy --only functions I get the following message","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":18,"length":32,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"6fni7","text":"i  deploying functions\ni  functions: ensuring required API cloudfunctions.googleapis.com is enabled...\ni  functions: ensuring required API cloudbuild.googleapis.com is enabled...\ni  artifactregistry: ensuring required API artifactregistry.googleapis.com is enabled...\n+  functions: required API cloudbuild.googleapis.com is enabled\n+  artifactregistry: required API artifactregistry.googleapis.com is enabled\n+  functions: required API cloudfunctions.googleapis.com is enabled\ni  functions: preparing codebase default for deployment\n!  functions: package.json indicates an outdated version of firebase-functions. Please upgrade \nusing npm install --save firebase-functions@latest in your functions directory.\n!  functions: Please note that there will be breaking changes when you upgrade.\ni  functions: Loaded environment variables from .env.prod.\n!  functions: You are using an old version of firebase-functions SDK (3.15.7). Please update \nfirebase-functions SDK to >=3.20.0\ni  functions: preparing functions directory for uploading...\ni  functions: packaged E:\\FlutterProjects\\pegasus\\functions (218.61 KB) for uploading\n\nError: Failed to fetch Run service undefined","type":"code-block","depth":0,"inlineStyleRanges":[{"offset":0,"length":1169,"style":"CODE"}],"entityRanges":[],"data":{}}],"entityMap":{}}"""
  body11 = r"""{"blocks":[{"key":"fislb","text":"I am just making a Database called Fruits from my app.js and connecting the database to MongoDB using Mongoose.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":50,"length":6,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"enbk9","text":"const mongoose = require(\"mongoose\");\n\nmongoose.connect(\"mongodb://localhost:27017/fruitsDB\", {useNewUrlParser: true});\n\nmongoose.set('strictQuery', false);\n\nconst fruitSchema = new mongoose.Schema({\n    name: String,\n    rating: Number,\n    review: String\n});\n\nconst Fruit = mongoose.model(\"Fruit\", fruitSchema);\n\nconst fruit = new Fruit({\n    name: \"Apple\",\n    rating: 7,\n    review: \"Taste Good\"\n});\n\nfruit.save();","type":"code-block","depth":0,"inlineStyleRanges":[{"offset":0,"length":418,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"9o4cm","text":"Whenever I try node app.js am getting DeprecationWarning. Even though, I tried using mongoose.set('strictQuery', true); the same error continues as follow:","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":15,"length":11,"style":"CODE"},{"offset":85,"length":34,"style":"CODE"},{"offset":38,"length":18,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"coeu3","text":"(node:15848) [MONGOOSE] DeprecationWarning: Mongoose: the `strictQuery` option w\nill be switched back to `false` by default in Mongoose 7. Use `mongoose.set('str\nictQuery', false);` if you want to prepare for this change. Or use `mongoose.set\n('strictQuery', true);` to suppress this warning.\n(Use `node --trace-deprecation ...` to show where the warning was created)      \nD:\\Web Development\\FruitsProject\\node_modules\\mongoose\\lib\\drivers\\node-mongodb-\nnative\\collection.js:158\n          const err = new MongooseError(message);\n                      ^\n\nMongooseError: Operation `fruits.insertOne()` buffering timed out after 10000ms \n    at Timeout.<anonymous> (D:\\Web Development\\FruitsProject\\node_modules\\mongoo\nse\\lib\\drivers\\node-mongodb-native\\collection.js:158:23)\n    at listOnTimeout (node:internal/timers:564:17)\n    at process.processTimers (node:internal/timers:507:7)\n\nNode.js v18.12.1","type":"code-block","depth":0,"inlineStyleRanges":[{"offset":0,"length":900,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"e2ktl","text":"And then the 2nd error also continues fruits.insertOne().","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":38,"length":18,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"9rfqv","text":"Because of this my MongoDB database is not getting updated.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"2ob2s","text":"test> show dbs\nadmin    40.00 KiB\nconfig  108.00 KiB\nlocal    40.00 KiB\nshopDB   72.00 KiB","type":"code-block","depth":0,"inlineStyleRanges":[{"offset":0,"length":90,"style":"CODE"}],"entityRanges":[],"data":{}},{"key":"2s137","text":"I just want to fix this error. But I don't know where to fix this error. The 2nd part of error it seems like it coming from the nodule_modules itself. How can I fix this error?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}"""
  body12 = r"""{"blocks":[{"key":"9ihm5","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"23fvu","text":"When two pointers are compared, the result depends on the relative locations in the address space of the objects pointed to. If two pointers to object or incomplete types both point to the same object, or both point one past the last element of the same array object, they compare equal. If the objects pointed to are members of the same aggregate object, pointers to structure members declared later compare greater than pointers to members declared earlier in the structure, and pointers to array elements with larger subscript values compare greater than pointers to elements of the same array with lower subscript values. All pointers to members of the same union object compare equal. If the expression P points to an element of an array object and the expression Q points to the last element of the same array object, the pointer expression Q+1 compares greater than P. In all other cases, the behavior is undefined.","type":"blockquote","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"bnq95","text":"If we have two pointers referencing the same type arrays and we have lengths of those arrays can we find if those arrays do not overlap without invoking a UB?","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"bglqp","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"8sdo0","text":"Remark: I am not interested in examples showing me that in the real life (implementation etc) it can be done. So please do not show the code (unless you can prove [standardwise] that is UB free).","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}"""

  question1 = Question(user_id=user1.id, title="How to make_from_tuple on the heap?", body=body1)
  question2 = Question(user_id=user2.id, title="yield from vs yield in for-loop", body=body2)
  question3 = Question(user_id=user3.id, title="How to solve error 'numpy' has no attribute 'float' in Python?", body=body3)
  question4 = Question(user_id=user1.id, title="Why are there two ways of expressing NULL in C?", body=body4)
  question5 = Question(user_id=user1.id, title="Difference between INT_MAX and __INT_MAX__ in C", body=body5)
  question6 = Question(user_id=user1.id, title="Can't push from Git Bash: Could not find UI helper 'GitHub.UI'", body=body6)
  question7 = Question(user_id=user2.id, title="What is the meaning of char foo(|10|) in C?", body=body7)
  question8 = Question(user_id=user2.id, title="Why is log(inf + inf j) equal to (inf + 0.785398 j), In C++/Python/NumPy?", body=body8)
  question9 = Question(user_id=user2.id, title="Better way to check if an element only exists in one array", body=body9)
  question10 = Question(user_id=user3.id, title="Can't deploy firebase functions (Failed to fetch Run service undefined)", body=body10)
  question11 = Question(user_id=user3.id, title="DeprecationWarning: Mongoose: the `strictQuery` option will be switched back to `false` by default", body=body11)
  question12 = Question(user_id=user3.id, title="Is it possible in C (not invoking UB) to check if two objects overlap?", body=body12)

  tag1 = Tag.query.filter(Tag.tag == 'python').one()
  tag2 = Tag.query.filter(Tag.tag == 'javascript').one()
  tag3 = Tag.query.filter(Tag.tag == 'reactjs').one()
  tag4 = Tag.query.filter(Tag.tag == 'react-router').one()
  tag5 = Tag.query.filter(Tag.tag == 'c').one()
  tag6 = Tag.query.filter(Tag.tag == 'null').one()
  tag7 = Tag.query.filter(Tag.tag == 'git').one()
  tag8 = Tag.query.filter(Tag.tag == 'mainframe').one()
  tag9 = Tag.query.filter(Tag.tag == 'c++').one()
  tag10 = Tag.query.filter(Tag.tag == 'memory-leaks').one()
  tag11 = Tag.query.filter(Tag.tag == 'canvas').one()
  tag12 = Tag.query.filter(Tag.tag == 'arrays').one()

  db.session.add(question1)
  db.session.add(question2)
  db.session.add(question3)
  db.session.add(question4)
  db.session.add(question5)
  db.session.add(question6)
  db.session.add(question7)
  db.session.add(question8)
  db.session.add(question9)
  db.session.add(question10)
  db.session.add(question11)
  db.session.add(question12)
  question1.tags.append(tag9)
  question2.tags.append(tag12)
  question4.tags.append(tag5)
  question4.tags.append(tag6)
  question5.tags.append(tag1)
  question5.tags.append(tag2)
  question6.tags.append(tag7)
  question7.tags.append(tag5)
  question8.tags.append(tag9)
  question8.tags.append(tag8)
  question9.tags.append(tag12)
  question10.tags.append(tag11)
  question11.tags.append(tag10)
  question12.tags.append(tag3)
  db.session.commit()

def undo_questions():
  if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.questions RESTART IDENTITY CASCADE;")
  else:
      db.session.execute("DELETE FROM questions")

  db.session.commit()
