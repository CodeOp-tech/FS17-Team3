function makePatchSQL(body, sellerId) {
    // Create an empty array to store all assignments
    let parts = [];

    // Check each of the possible properties
    if ('picurl' in body) {
        parts.push( `picurl = '${body['picurl']}'` );
    }
    if ('coverurl' in body) {
        parts.push( `coverurl = '${body['coverurl']}'` );
    }
    if ('shopname' in body) {
        parts.push( `shopname = ${body['shopname']}` );
    }
    if ('description' in body) {
        parts.push( `description = ${body['description']}` );
    }

    // Combine everything into an SQL statement
    let sql = 'UPDATE sellers SET ';
    sql += parts.join(', ');
    sql += `WHERE sellerid = ${sellerId}`;

    return sql;
}

module.exports = {
    makePatchSQL 
}