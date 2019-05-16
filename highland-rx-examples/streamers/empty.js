import { empty } from '../../highland-rx';

// output: 'Complete!'
empty().subscribe(() => console.log('Next'), null, () => console.log('Complete!'));
