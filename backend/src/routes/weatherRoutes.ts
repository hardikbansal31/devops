import { Router } from 'express';
import { getWeather, getAutocomplete } from '../controllers/weatherController';

const router = Router();

router.get('/:city', getWeather);
router.get('/autocomplete/:query', getAutocomplete);

export default router;