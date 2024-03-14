//********** Imports **********//
import app from './app';

const port = process.env.PORT || 5500;
app.listen(port, () => {
  console.log(`Listening du index.ts: http://localhost:${port}`);
});


