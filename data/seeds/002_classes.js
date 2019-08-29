exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('classes').insert([
        {
            name: 'Axe Practice',
            type: 'High Intensity',
            location: 'Garreg Mach Monastery',
            instructor_id: 4
        },
        {
            name: 'Riding Practice',
            type: 'High Intensity',
            location: 'Garreg Mach Monastery',
            instructor_id: 4
        },
        {
            name: 'Archery',
            type: 'High Intensity',
            location: 'Garreg Mach Monastery',
            instructor_id: 4
        }
    ]);
};
