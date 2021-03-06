import { HttpAuth } from '../../config/Http';
import { changeLoading  } from './loading.action';
import { changeNotify } from './notify.action';

export const actionTypes = {
    INDEX: 'UNIT_INDEX',
    STORE: 'UNIT_STORE',
    UPDATE: 'UNIT_UPDATE',
    DESTROY: 'UNIT_DESTROY',
    CHANGE: 'UNIT_CHANGE',
    SUCCESS: 'UNIT_SUCCESS',
    ERROR: 'UNIT_ERROR'
}

export const change = (payload) => ({
    type: actionTypes.CHANGE,
    payload
});

export const success = (payload) => ({
    type: actionTypes.SUCCESS,
    payload
});

export const error = (payload) => ({
    type: actionTypes.ERROR,
    payload
});

//INDEX
export const indexResponse = (payload) => ({
    type: actionTypes.INDEX,
    payload
});

export const index = (query) => dispatch => {
    return HttpAuth.get('/units?' + new URLSearchParams(query))
        .then(response => typeof response !== 'undefined' && dispatch(indexResponse(response.data)));
}

//STORE
export const storeResponse = (payload) => ({
    type: actionTypes.STORE,
    payload
});

export const store = (data) => dispatch => {    
    dispatch(changeLoading({ open: true }));
    
    return HttpAuth.post('/units', data)
        .then(response => {
            dispatch(changeLoading({ open: false }));

            if (typeof response !== 'undefined') {
                if (response.data.error) {
                    dispatch(error(response.data.error));
                }

                if (response.data.id) {
                    dispatch(storeResponse(response.data));
                    dispatch(success(true));
                    dispatch(changeNotify({ 
                        open: true, 
                        msg: 'Unidade cadastrada com sucesso',
                        class: 'success'
                    }));
                }
            }
        });
};

//SHOW
export const show = (id) => dispatch => {
    return HttpAuth.get('/units/' + id)
        .then(response => typeof response !== 'undefined' && dispatch(indexResponse(response.data)));
}

//UPDATE
export const updateResponse = (payload) => ({
    type: actionTypes.UPDATE,
    payload
});

export const update = (data) => dispatch => {
    dispatch(changeLoading({ open: true }));

    return HttpAuth.put('/units/' + data.id, data)
        .then(response => {
            dispatch(changeLoading({ open: false }));

            if (typeof response !== 'undefined') {
                if (response.data.error) {
                    dispatch(error(data.data.error));                    
                }

                if (response.data.status === 200) {
                    dispatch(updateResponse(data));
                    dispatch(success(true));
                }
            }
        });
}

//DESTROY
export const destroyResponse = (payload) => ({
    type: actionTypes.DESTROY,
    payload
});

export const destroy = (id) => dispatch => {
    return HttpAuth.delete('/units/' + id)
        .then(response => typeof response !== 'undefined' && dispatch(destroyResponse(id)));
};

//CEP
export const cep = (zipCode) => dispatch => {        
    if (zipCode.length > 8) {
        return HttpAuth.post('/webservice/cep', {
            cep: zipCode
        }).then(response => typeof response !== 'undefined' && dispatch(change(response.data)));
    }
}
