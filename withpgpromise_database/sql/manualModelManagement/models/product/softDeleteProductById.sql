UPDATE public.products p 
    SET is_active = false
    WHERE p.id = ${id};