const express = require('express');
const {getHospitals, getHospital, createHospital, updateHospital, deleteHospital,getVacCenters} = require('../controllers/hospitals')

const appointmentRouter = require('./appointments');


const router = express.Router();

const {protect,authorize} = require('../middleware/auth');

router.use('/:hospitalId/appointments/',appointmentRouter);

router.route('/vacCenters').get(getVacCenters);
router.route('/').get(getHospitals).post(protect, authorize('admin'), createHospital);
router.route('/:id').get(getHospital).put(protect, authorize('admin'), updateHospital).delete(protect, authorize('admin'), deleteHospital);

/**
 * @swagger
 * components:
 *  schemas:
 *      Hospitals:
 *          type: object
 *          required:
 *              - name
 *              - address
 *          properties:
 *              id:
 *                  type: string
 *                  format: uuid
 *                  description: the auto-generated id of the hospital
 *                  example: d290f1ee-6c54-4b01-90e6-d701748f0851
 *              ลำดับ:
 *                  type: string
 *                  description: Ordinal number
 *              name:
 *                  type: string
 *                  description: Hospital name
 *              address:
 *                  type: string
 *                  description: House No., Street, Road
 *              district:
 *                  type: string
 *                  description: District
 *              province:
 *                  type: string
 *                  description: province
 *              postalcode:
 *                  type: string
 *                  description: 5-digit postal code
 *              tel:
 *                  type: string
 *                  description: telephone number
 *              region:
 *                  type: string
 *                  description: region
 *              example:
 *                  id:61e9750a75bc69b195841547
 *                  ลำดับ:5
 *                  name:"เจ้าพระยา"
 *                  address:"113/44 ถ.พระบรมราชชนนี บางบำหรุ"
 *                  district:"บางพลัด"
 *                  province:"กรุงเทพมหานคร"
 *                  postalcode:10700
 *                  tel:"02-4340117"
 *                  region:"กรุงเทพมหานคร (Bangkok)"
 */

/**
 * @swagger
 * tags:
 *  name: Hospitals
 *  description: The hospitals managing API
 */

/**
 * @swagger
 * /hospitals:
 *      get:
 *          summary: Return the list of all the hospitals
 *          tags: [Hospitals]
 *          responses:
 *              200:
 *                  description: The list of the hospital
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Hospital'
 */

/**
 * @swagger
 * /hospitals/{id}:
 *      get:
 *          summary: Get the hospital by id
 *          tags: [Hospitals]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: The hospital id
 *          responses:
 *              200:
 *                  description: The hospital description by id
 *                  contents:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Hospital'
 *              404:
 *                  description: The hospital was not found
 */

/**
 * @swagger
 * /hospitals:
 *      post:
 *          summary: Create a new hospital
 *          tags: [Hospitals]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Hospital'
 *          responses:
 *              200:
 *                  description: The hospital was successfully created
 *                  contents:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Hospital'
 *              500:
 *                  description: Some server error
 */


/**
 * @swagger
 * /hospitals/{id}:
 *      put:
 *          summary: Update the hospital by the id
 *          tags: [Hospitals]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: The hospital id
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Hospital'
 *          responses:
 *              200:
 *                  description: The hospital was successfully created
 *                  contents:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Hospital'
 *              404:
 *                  description: The hospital was not found
 *              500:
 *                  description: Some server error
 */


/**
 * @swagger
 * /hospitals/{id}:
 *      delete:
 *          summary: Remove the hospital by id
 *          tags: [Hospitals]
 *          parameters:
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: The hospital id
 *          responses:
 *              200:
 *                  description: The hospital was deleted
 *              404:
 *                  description: The hospital was not found
 */

module.exports=router;







