import { Router } from 'express';
import appointmentRouter from '@modules/appointment/infra/http/routes/appointments.routes';
import userRouter from '@modules/user/infra/http/routes/user.routes';
import sessionRouter from '@modules/user/infra/http/routes/session.routes';
import passwordRouter from '@modules/user/infra/http/routes/password.routes';
import profileRouter from '@modules/user/infra/http/routes/profile.routes';
import providerRouter from '@modules/appointment/infra/http/routes/provider.routes';

const routes = Router();

routes.use('/appointments', appointmentRouter);
routes.use('/users', userRouter);
routes.use('/sessions', sessionRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/provider', providerRouter);

export default routes;
