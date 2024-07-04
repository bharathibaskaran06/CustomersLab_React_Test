import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faSquareMinus } from '@fortawesome/free-solid-svg-icons';

const schemaOptions = [
  { label: 'First Name', value: 'first_name' },
  { label: 'Last Name', value: 'last_name' },
  { label: 'Gender', value: 'gender' },
  { label: 'Age', value: 'age' },
  { label: 'Account Name', value: 'account_name' },
  { label: 'City', value: 'city' },
  { label: 'State', value: 'state' }
];

function Popup({ closePopup }) {
  const [segmentName, setSegmentName] = useState('');
  const [selectedSchemas, setSelectedSchemas] = useState([]);
  const [availableSchemas, setAvailableSchemas] = useState(schemaOptions);
  const [selectedSchema, setSelectedSchema] = useState('');

  const handleAddSchema = () => {
    if (selectedSchema) {
      const schema = availableSchemas.find(s => s.value === selectedSchema);
      setSelectedSchemas([...selectedSchemas, schema]);
      setAvailableSchemas(availableSchemas.filter(s => s.value !== selectedSchema));
      setSelectedSchema('');
    }
  };

  const handleRemoveSchema = (index) => {
    const removedSchema = selectedSchemas[index];
    setSelectedSchemas(selectedSchemas.filter((_, i) => i !== index));
    setAvailableSchemas([...availableSchemas, removedSchema]);
  };

  const handleSaveSegment = () => {
    const segmentData = {
      segment_name: segmentName,
      schema: selectedSchemas.map(s => ({ [s.value]: s.label }))
    };

    console.log('Segment Data:', segmentData);

    axios.post('https://cors-anywhere.herokuapp.com/https://webhook.site/eff2a849-e536-495f-a043-242ac57166b2', segmentData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log('Success:', response.data);
      closePopup();
    })
    .catch(error => {
      console.error('Error sending webhook:', error);
    });
  };

  return (
    <div className="popup">
      <div className="popup-inner">
        <h3 className='iconfont '><span className='iconpading'><FontAwesomeIcon icon={faChevronLeft} /></span>Saving Segment</h3>
        <div className='form-style'>
          <label className='fontlabel'>
            Enter the name of the Segment
            <div>
              <input className='w-100' type="text" value={segmentName} onChange={e => setSegmentName(e.target.value)} />
              <p>To save your segment you need to add the schemas to build the query</p>
            </div>
          </label>
          <div className="selected-schemas">
            {selectedSchemas.map((schema, index) => (
              <div key={index} className="schema-item">
                <select className="uniform-input"
                  value={schema.value}
                  onChange={e => {
                    const newSchemas = [...selectedSchemas];
                    const newSchema = schemaOptions.find(s => s.value === e.target.value);
                    newSchemas[index] = newSchema;
                    setSelectedSchemas(newSchemas);
                    setAvailableSchemas(schemaOptions.filter(s => !newSchemas.some(ns => ns.value === s.value)));
                  }}
                >
                  {schemaOptions
                    .filter(s => !selectedSchemas.some(ns => ns.value === s.value) || s.value === schema.value)
                    .map(s => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                </select>
                <p onClick={() => handleRemoveSchema(index)} className="remove-schema-button ">
                <FontAwesomeIcon className='uniform-input pad-icon' icon={faSquareMinus} style={{ color: 'rgb(199, 241, 228)' }} />   
                </p>
              </div>
            ))}
          </div>
          <div className='select-container'>
            <select className="uniform-input" value={selectedSchema} onChange={e => setSelectedSchema(e.target.value)}>
              <option value="">Add schema to segment</option>
              {availableSchemas.map(schema => (
                <option key={schema.value} value={schema.value}>
                  {schema.label}
                </option>
              ))}
            </select>
            
               
               
          </div>
          <div>
            <p className="link-add" onClick={handleAddSchema}>+Add new schema</p>
          </div>
          <div class="footer">
          <button onClick={handleSaveSegment} className="save-btn save">Save segment</button>
          <button onClick={closePopup} className="save-btn cancel">Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Popup;
