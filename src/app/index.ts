import { createExpressServer } from 'routing-controllers';
import { AccountController } from '../controllers/AccountController';

class App {
  static async init() {
    const app = createExpressServer({
      controllers: [AccountController],
    });

    const port = 3003;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
}

export default App