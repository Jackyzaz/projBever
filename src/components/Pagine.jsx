import React from 'react'
import { Pagination } from 'react-bootstrap'

const Pagine = ({searchPage}) => {
    return (
        <>
            <Pagination className='mt-3 text-center justify-content-center' variant='danger'>
                <Pagination.First onClick={() => { setSearchPage(1) }} />
                <Pagination.Prev onClick={() => { goPrevPage(1) }} />
                {searchPage - 1 == 0 ? <></> :
                    <>
                        <Pagination.Item onClick={() => { goPrevPage(1) }}>{searchPage - 1}</Pagination.Item>
                    </>}

                <Pagination.Item active onClick={fetchProblem}>{searchPage}</Pagination.Item>
                <Pagination.Item onClick={() => { goNextPage(1) }}>{searchPage + 1}</Pagination.Item>

                {searchPage + 3 > parseInt((data.length / 20).toFixed(0)) ? <></> :
                    <>
                        <Pagination.Item onClick={() => { goNextPage(2) }}>{searchPage + 2}</Pagination.Item>
                        <Pagination.Ellipsis />
                        <Pagination.Item onClick={() => { setSearchPage(parseInt((data.length / 20).toFixed(0))) }}>{(data.length / 20).toFixed(0)}</Pagination.Item>
                    </>}



                <Pagination.Next onClick={() => { goNextPage(1) }} />
                <Pagination.Last onClick={() => { setSearchPage(parseInt((data.length / 20).toFixed(0))) }} />
            </Pagination>
        </>
    )
}

export default Pagine