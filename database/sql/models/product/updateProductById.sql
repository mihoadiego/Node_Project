UPDATE public.products p 
    SET title = ${title}, 
        image_url = ${image_url}, 
        description = ${description}, 
        price = ${price} 
    WHERE p.id = ${id};