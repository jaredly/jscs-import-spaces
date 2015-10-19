# Import Spaces JSCS Plugin

Rules:

## requireImportSpaces: true
This is wrong:
```js
import {something} from "lib";
```

This is right:
```js
import { something } from "lib";
```

Fortunately `jscs` can turn the one into the other for you automatically!
