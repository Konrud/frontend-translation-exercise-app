For this project I've decided to implement 2 different solutions
as I wasn't quite sure regarding the requirements.

# First Solution
In the first solution I'd used dynamic `import` feature for getting JSON object from 
the same folder where our component is saved. This

# Second Solution
For the second solution I'd decided to go with the `fetch` and wrap it into custom hook `useFetch`.
In this case our JSON object is located in the `public` directory.

## What else could be done?
Ofcourse, there are another solutions to this problem.
As an example we could use `<Suspense>`, but I've thought it might be overkill.


*NOTE*: I'm not sure that I've fully understood the requirements for this excersice. 
I'd say they're a bit ambiguous.