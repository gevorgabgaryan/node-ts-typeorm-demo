import { createExpressServer } from 'routing-controllers';
import { BankController } from './controllers/BankController';

const app = createExpressServer({
    controllers: [BankController]
})

const port = 3003;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
